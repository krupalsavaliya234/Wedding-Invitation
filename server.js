import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Rsvp from './models/Rsvp.js';
import WeddingInvitation from './models/WeddingInvitation.js';
import crypto from 'crypto';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// MongoDB Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connected successfully');
    } catch (error) {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    }
};

connectDB();

// Authentication Middleware
const authenticateAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided'
        });
    }

    // Simple token verification (in production, use JWT)
    const expectedToken = crypto
        .createHash('sha256')
        .update(`${process.env.ADMIN_EMAIL}:${process.env.ADMIN_PASSWORD}`)
        .digest('hex');

    if (token === expectedToken) {
        next();
    } else {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

// ==================== ADMIN ROUTES ====================

// Admin Login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Verify credentials from environment variables
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate token
            const token = crypto
                .createHash('sha256')
                .update(`${email}:${password}`)
                .digest('hex');

            res.status(200).json({
                success: true,
                message: 'Login successful',
                token
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Login failed'
        });
    }
});

// Verify Token
app.get('/api/admin/verify', authenticateAdmin, (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Token is valid'
    });
});

// Get all invitations (Admin)
app.get('/api/admin/invitations', authenticateAdmin, async (req, res) => {
    try {
        const invitations = await WeddingInvitation.find()
            .sort({ createdAt: -1 })
            .select('-__v');

        res.status(200).json({
            success: true,
            count: invitations.length,
            data: invitations
        });
    } catch (error) {
        console.error('Error fetching invitations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invitations'
        });
    }
});

// Get single invitation (Admin)
app.get('/api/admin/invitations/:id', authenticateAdmin, async (req, res) => {
    try {
        const invitation = await WeddingInvitation.findById(req.params.id);

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: 'Invitation not found'
            });
        }

        res.status(200).json({
            success: true,
            data: invitation
        });
    } catch (error) {
        console.error('Error fetching invitation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invitation'
        });
    }
});

// Create new invitation
app.post('/api/admin/invitations', authenticateAdmin, async (req, res) => {
    try {
        const invitationData = req.body;

        // Generate slug if not provided
        if (!invitationData.slug && invitationData.groomName && invitationData.brideName) {
            const groomSlug = invitationData.groomName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const brideSlug = invitationData.brideName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            invitationData.slug = `${groomSlug}-${brideSlug}`;
        }

        // Generate couple display name if not provided
        if (!invitationData.coupleDisplayName && invitationData.groomName && invitationData.brideName) {
            invitationData.coupleDisplayName = `${invitationData.groomName} & ${invitationData.brideName}`;
        }

        const invitation = new WeddingInvitation(invitationData);
        await invitation.save();

        res.status(201).json({
            success: true,
            message: 'Invitation created successfully',
            data: invitation
        });
    } catch (error) {
        console.error('Error creating invitation:', error);
        
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Slug already exists. Please use a different couple name combination.'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Failed to create invitation',
            error: error.message
        });
    }
});

// Update invitation
app.put('/api/admin/invitations/:id', authenticateAdmin, async (req, res) => {
    try {
        const invitationData = req.body;
        invitationData.updatedAt = Date.now();

        // Regenerate slug if names changed
        if (invitationData.groomName || invitationData.brideName) {
            const existing = await WeddingInvitation.findById(req.params.id);
            const groomName = invitationData.groomName || existing.groomName;
            const brideName = invitationData.brideName || existing.brideName;
            
            const groomSlug = groomName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const brideSlug = brideName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            invitationData.slug = `${groomSlug}-${brideSlug}`;
        }

        const invitation = await WeddingInvitation.findByIdAndUpdate(
            req.params.id,
            invitationData,
            { new: true, runValidators: true }
        );

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: 'Invitation not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Invitation updated successfully',
            data: invitation
        });
    } catch (error) {
        console.error('Error updating invitation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update invitation',
            error: error.message
        });
    }
});

// Delete invitation
app.delete('/api/admin/invitations/:id', authenticateAdmin, async (req, res) => {
    try {
        const invitation = await WeddingInvitation.findByIdAndDelete(req.params.id);

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: 'Invitation not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Invitation deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting invitation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete invitation'
        });
    }
});

// Duplicate invitation
app.post('/api/admin/invitations/:id/duplicate', authenticateAdmin, async (req, res) => {
    try {
        const original = await WeddingInvitation.findById(req.params.id);

        if (!original) {
            return res.status(404).json({
                success: false,
                message: 'Invitation not found'
            });
        }

        // Create duplicate with new slug
        const duplicateData = original.toObject();
        delete duplicateData._id;
        delete duplicateData.createdAt;
        delete duplicateData.updatedAt;
        
        duplicateData.slug = `${duplicateData.slug}-copy-${Date.now()}`;
        duplicateData.status = 'draft';
        duplicateData.coupleDisplayName = `${duplicateData.groomName} & ${duplicateData.brideName} (Copy)`;

        const duplicate = new WeddingInvitation(duplicateData);
        await duplicate.save();

        res.status(201).json({
            success: true,
            message: 'Invitation duplicated successfully',
            data: duplicate
        });
    } catch (error) {
        console.error('Error duplicating invitation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to duplicate invitation'
        });
    }
});

// ==================== PUBLIC ROUTES ====================

// Get invitation by slug (Public)
app.get('/api/invitations/:slug', async (req, res) => {
    try {
        const invitation = await WeddingInvitation.findOne({ 
            slug: req.params.slug,
            status: 'active'
        });

        if (!invitation) {
            return res.status(404).json({
                success: false,
                message: 'Invitation not found'
            });
        }

        res.status(200).json({
            success: true,
            data: invitation
        });
    } catch (error) {
        console.error('Error fetching invitation:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invitation'
        });
    }
});

// Get all active invitations (Public - for listing)
app.get('/api/invitations', async (req, res) => {
    try {
        const invitations = await WeddingInvitation.find({ status: 'active' })
            .select('slug coupleDisplayName weddingDate venueCity venueState coverImage')
            .sort({ weddingDate: 1 });

        res.status(200).json({
            success: true,
            count: invitations.length,
            data: invitations
        });
    } catch (error) {
        console.error('Error fetching invitations:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch invitations'
        });
    }
});

// ==================== RSVP ROUTES ====================

// Submit RSVP
app.post('/api/rsvp', async (req, res) => {
    try {
        const { name, email, phone, numberOfGuests, attendance, message } = req.body;

        // Validation
        if (!name || !email || !phone || !attendance) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Create new RSVP
        const rsvp = new Rsvp({
            name,
            email,
            phone,
            numberOfGuests: attendance === 'yes' ? numberOfGuests : 0,
            attendance,
            message: message || ''
        });

        await rsvp.save();

        res.status(201).json({
            success: true,
            message: 'RSVP submitted successfully',
            data: rsvp
        });
    } catch (error) {
        console.error('Error submitting RSVP:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to submit RSVP. Please try again.'
        });
    }
});

// Get all RSVPs (for admin view)
app.get('/api/admin/rsvps', authenticateAdmin, async (req, res) => {
    try {
        const rsvps = await Rsvp.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: rsvps.length,
            data: rsvps
        });
    } catch (error) {
        console.error('Error fetching RSVPs:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch RSVPs'
        });
    }
});

// Get RSVP statistics
app.get('/api/admin/stats', authenticateAdmin, async (req, res) => {
    try {
        const totalRsvps = await Rsvp.countDocuments();
        const attending = await Rsvp.countDocuments({ attendance: 'yes' });
        const notAttending = await Rsvp.countDocuments({ attendance: 'no' });

        const attendingGuests = await Rsvp.aggregate([
            { $match: { attendance: 'yes' } },
            { $group: { _id: null, total: { $sum: '$numberOfGuests' } } }
        ]);

        res.status(200).json({
            success: true,
            stats: {
                totalRsvps,
                attending,
                notAttending,
                totalGuests: attendingGuests[0]?.total || 0
            }
        });
    } catch (error) {
        console.error('Error fetching RSVP stats:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch statistics'
        });
    }
});

// Health check
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running',
        timestamp: new Date().toISOString()
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    },
    image: {
        type: String,
        default: ''
    }
}, { _id: true });

const weddingInvitationSchema = new mongoose.Schema({
    // Couple Details
    brideName: {
        type: String,
        required: true,
        trim: true
    },
    groomName: {
        type: String,
        required: true,
        trim: true
    },
    coupleDisplayName: {
        type: String,
        required: true,
        trim: true
    },
    couplePhoto: {
        type: String,
        default: ''
    },

    // Wedding Details
    weddingDate: {
        type: Date,
        required: true
    },
    weddingTime: {
        type: String,
        required: true,
        trim: true
    },
    venueName: {
        type: String,
        required: true,
        trim: true
    },
    venueAddress: {
        type: String,
        required: true,
        trim: true
    },
    venueCity: {
        type: String,
        required: true,
        trim: true
    },
    venueState: {
        type: String,
        required: true,
        trim: true
    },
    googleMapsLink: {
        type: String,
        default: ''
    },

    // Events
    events: [eventSchema],

    // Media
    coverImage: {
        type: String,
        default: ''
    },
    galleryImages: [{
        type: String
    }],
    backgroundMusic: {
        type: String,
        default: ''
    },

    // Theme Settings
    theme: {
        type: String,
        enum: ['Royal Maroon & Gold', 'Floral Pastel', 'South Indian Traditional', 'Modern Minimal'],
        default: 'Royal Maroon & Gold'
    },
    fontStyle: {
        type: String,
        default: 'Playfair Display'
    },
    primaryColor: {
        type: String,
        default: '#7A1E2D'
    },
    secondaryColor: {
        type: String,
        default: '#D4AF37'
    },

    // SEO & URL
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    // Status
    status: {
        type: String,
        enum: ['active', 'draft'],
        default: 'draft'
    },

    // Timestamps
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update the updatedAt field before saving
weddingInvitationSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Generate slug from couple names
weddingInvitationSchema.pre('save', function(next) {
    if (!this.slug && this.groomName && this.brideName) {
        const groomSlug = this.groomName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const brideSlug = this.brideName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        this.slug = `${groomSlug}-${brideSlug}`;
    }
    next();
});

const WeddingInvitation = mongoose.model('WeddingInvitation', weddingInvitationSchema);

export default WeddingInvitation;

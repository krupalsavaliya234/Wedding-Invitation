# Admin Panel Setup Guide

## Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

```env
# Admin Credentials
ADMIN_EMAIL=admin@wedding.com
ADMIN_PASSWORD=securepassword123

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/wedding-invitations

# Server Port
PORT=5000

# JWT Secret (for future token-based auth)
JWT_SECRET=your-secret-key-here
```

## Features

### Admin Authentication
- Login using email and password from environment variables
- Session-based authentication with secure token storage
- Protected admin routes

### Admin Panel Features

1. **Dashboard**
   - View total invitations count
   - View active and draft invitations
   - Quick access to create new invitations
   - Recent RSVP activity

2. **Invitations Management**
   - Create new wedding invitations
   - Edit existing invitations
   - Delete invitations (with confirmation)
   - Duplicate invitations
   - View invitation preview

3. **Invitation Form Fields**
   - **Couple Details**: Groom name, Bride name, Couple photo
   - **Wedding Details**: Date, time, venue, address, city, state, Google Maps link
   - **Events**: Dynamic events (Engagement, Mehndi, Haldi, Wedding, Reception)
   - **Media**: Cover image, gallery images, background music
   - **Theme Settings**: Theme selection, font style, color pickers
   - **Status**: Draft or Active (Published)

4. **Public Invitations**
   - Each invitation accessible via unique URL slug
   - Format: `/invite/{couple-slug}`
   - Example: `/invite/raj-priya`
   - Only active invitations are publicly visible

## Usage

1. **Start the server**:
   ```bash
   npm run dev:all
   ```

2. **Access Admin Panel**:
   - Navigate to `/admin/login`
   - Login with your admin credentials

3. **Create Invitation**:
   - Go to Dashboard → Click "New Invitation"
   - Fill in all required fields
   - Set status to "Active" to publish
   - Save the invitation

4. **View Public Invitation**:
   - After creating, click "View" button
   - Or access directly: `/invite/{slug}`

## API Endpoints

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/verify` - Verify token
- `GET /api/admin/invitations` - Get all invitations
- `GET /api/admin/invitations/:id` - Get single invitation
- `POST /api/admin/invitations` - Create invitation
- `PUT /api/admin/invitations/:id` - Update invitation
- `DELETE /api/admin/invitations/:id` - Delete invitation
- `POST /api/admin/invitations/:id/duplicate` - Duplicate invitation

### Public Endpoints
- `GET /api/invitations/:slug` - Get invitation by slug (active only)
- `GET /api/invitations` - Get all active invitations

## Database Schema

The `WeddingInvitation` model includes:
- Couple information
- Wedding details and venue
- Dynamic events array
- Media URLs
- Theme settings
- SEO slug
- Status (active/draft)

## Security Notes

- Admin credentials are stored in environment variables
- All admin routes are protected with authentication middleware
- Tokens are stored in localStorage (consider upgrading to httpOnly cookies in production)
- Public routes only show active invitations

## Next Steps

1. Set up MongoDB database
2. Configure environment variables
3. Start the development server
4. Create your first invitation!

# Freight Radar 2

A digital platform that gives organizations a unified view of all their shipments in one powerful dashboard.

## Setup Instructions

### Prerequisites

- Node.js 18+ installed
- Supabase account
- Vercel account (for deployment)

### Local Development

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/freight-radar-2.git
   cd freight-radar-2
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up your environment variables
   Copy `.env.local.example` to `.env.local` and fill in the values:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   ADMIN_ACCESS_KEY=your-admin-access-key
   ```

4. Set up the database
   Run the SQL commands in `supabase-setup.sql` in your Supabase SQL editor.

5. Start the development server
   ```bash
   npm run dev
   ```

### Deployment to Vercel

1. Push your code to GitHub

2. Connect your repository to Vercel

3. Configure environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_ACCESS_KEY`

4. Deploy!

## Features

- Real-time tracking of shipments
- Unified dashboard
- Email submission capture
- Admin panel for viewing submitted emails

## Email Submission System

The platform includes a system to capture and store email addresses from visitors interested in requesting a demo:

1. Visitors submit their email through the form on the marketing page
2. Emails are stored in a Supabase database
3. Admin users can view all submitted emails at `/admin/email-submissions`

To access the admin page, use the access key configured in your environment variables.

## Security Considerations

- The admin page is protected with a simple access key
- For production, consider implementing a more robust authentication system
- All sensitive keys are stored as environment variables
- Never commit `.env.local` to version control

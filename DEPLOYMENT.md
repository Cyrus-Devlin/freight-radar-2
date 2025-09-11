# Deployment Guide for Freight Radar 2

This guide walks through the steps to deploy Freight Radar 2 to production using Vercel and Supabase.

## Prerequisites

- A GitHub account
- A Vercel account
- A Supabase account
- Your project code pushed to GitHub

## Step 1: Set up Supabase

1. **Create a new Supabase project** (if you haven't already)
   - Go to [Supabase](https://app.supabase.io/)
   - Click "New Project"
   - Fill in the required details and create your project

2. **Get your Supabase credentials**
   - In your Supabase dashboard, go to Settings > API
   - Note down the following:
     - **URL**: `https://[your-project-id].supabase.co`
     - **anon/public key**: For client-side access
     - **service_role key**: For server-side access (keep this secure!)

3. **Run the database setup script locally**
   ```bash
   # Make sure you've set up your .env.local file with Supabase credentials
   node scripts/setup-supabase.js
   ```

## Step 2: Deploy to Vercel

1. **Connect your repository**
   - Go to [Vercel](https://vercel.com/)
   - Click "Import Project" or "New Project"
   - Select your GitHub repository
   - Click "Import"

2. **Configure environment variables**
   - In the Vercel deployment screen, click "Environment Variables"
   - Add the following variables:
     - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
     - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key
     - `ADMIN_ACCESS_KEY`: Create a secure random key for API access
     - `ADMIN_PASSWORD`: Create a secure password for admin access
     - `NEXT_PUBLIC_SITE_URL`: Set to your Vercel deployment URL

3. **Deploy the project**
   - Click "Deploy"
   - Wait for the deployment to complete

## Step 3: Verify the deployment

1. **Test the landing page**
   - Visit your deployed URL
   - Make sure the page loads correctly with images and styling

2. **Test the email capture form**
   - Submit an email through the form on the landing page
   - Check for successful submission message

3. **Test the admin panel**
   - Visit `/admin/login` on your deployed URL
   - Log in with your admin password
   - Access `/admin/email-submissions` and verify you can see submitted emails

4. **Test the API**
   - Visit `/api/test-supabase?key=YOUR_ADMIN_ACCESS_KEY`
   - Verify you get a successful connection response

## Common Issues and Troubleshooting

### Issue: Database table doesn't exist
- Solution: Run the setup script again or manually create the table in Supabase:
  ```sql
  CREATE TABLE IF NOT EXISTS email_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL UNIQUE,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_agent TEXT,
    referer TEXT
  );
  ```

### Issue: Authentication not working
- Check that your environment variables are properly set in Vercel
- Make sure cookies are being set correctly (check browser dev tools)
- Verify the admin password matches what you set in the environment variables

### Issue: API returning 500 errors
- Check Vercel logs for detailed error messages
- Verify Supabase connection by testing `/api/test-supabase` endpoint
- Make sure all environment variables are properly set

## Security Considerations

- The admin panel is protected by password authentication
- API endpoints that retrieve sensitive data are protected by access keys
- Make sure to use strong passwords and keys in production
- Consider adding rate limiting for form submissions to prevent abuse

## Next Steps

- Set up custom domain in Vercel
- Configure email alerts for new submissions
- Add analytics to track form conversion rates
- Implement proper user management if needed

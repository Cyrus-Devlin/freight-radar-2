# Setting Up Supabase for Freight Radar 2

This guide provides multiple ways to set up the required `email_submissions` table in Supabase.

## Option 1: Using the Setup Script (Automatic)

1. Make sure your `.env.local` file contains the correct Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Run the setup script:
   ```bash
   npm run create-table
   ```

3. If successful, you'll see confirmation in the console.

## Option 2: Using Supabase SQL Editor (Manual)

1. Log in to your [Supabase Dashboard](https://app.supabase.com/)

2. Select your project

3. Go to the SQL Editor tab

4. Copy and paste the SQL from `scripts/create-table.sql`

5. Run the SQL script

## Option 3: Using Supabase CLI (Advanced)

If you have the Supabase CLI installed, you can also use it to run migrations:

1. Install Supabase CLI if not already installed:
   ```bash
   npm install -g supabase
   ```

2. Link your project:
   ```bash
   supabase link --project-ref <your-project-id> --password <your-db-password>
   ```

3. Create a migration:
   ```bash
   supabase migration new create_email_submissions
   ```

4. Copy the SQL from `scripts/create-table.sql` to the generated migration file

5. Apply the migration:
   ```bash
   supabase db push
   ```

## Verifying the Table

After setting up the table, you can verify it by:

1. Going to the Supabase Dashboard > Table Editor
2. You should see the `email_submissions` table
3. You can also run a test query in the SQL Editor:
   ```sql
   SELECT * FROM public.email_submissions;
   ```

## Table Structure

The `email_submissions` table has the following structure:

| Column      | Type       | Description                               |
|-------------|------------|-------------------------------------------|
| id          | UUID       | Primary key, auto-generated               |
| email       | TEXT       | Email address (unique)                    |
| timestamp   | TIMESTAMPTZ | When the email was submitted              |
| user_agent  | TEXT       | Browser/device info of the submitter      |
| referer     | TEXT       | Page from which the email was submitted   |

## Troubleshooting

If you encounter any issues:

1. Check that your Supabase credentials are correct in `.env.local`
2. Ensure your service role key has the necessary permissions
3. Try running the SQL manually in the Supabase SQL Editor
4. Check for any error messages in the console output

For more help, refer to the [Supabase documentation](https://supabase.com/docs).

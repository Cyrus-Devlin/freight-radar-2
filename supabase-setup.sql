-- This is an SQL script to add to your Supabase project
-- You can run this in the Supabase SQL editor

-- Enable the UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create a function that can execute SQL statements
-- Note: This is powerful and should be restricted in production
CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_query;
END;
$$;

-- Create a function to create the email_submissions table if it doesn't exist
CREATE OR REPLACE FUNCTION create_email_submissions_table()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  CREATE TABLE IF NOT EXISTS email_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    user_agent TEXT,
    referer TEXT
  );
END;
$$;

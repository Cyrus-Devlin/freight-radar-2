-- Create email submissions table with the correct schema
CREATE TABLE IF NOT EXISTS public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  timestamp TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  referer TEXT
);

-- Add comment to table
COMMENT ON TABLE public.email_submissions IS 'Stores email addresses submitted through the website''s contact form';

-- Test insert
INSERT INTO public.email_submissions (email, timestamp)
VALUES ('test@example.com', now())
ON CONFLICT (email) DO NOTHING;

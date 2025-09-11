-- Create email submissions table
CREATE TABLE IF NOT EXISTS public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  timestamp TIMESTAMPTZ DEFAULT now(),
  user_agent TEXT,
  referer TEXT
);

-- Add comment to table
COMMENT ON TABLE public.email_submissions IS 'Stores email addresses submitted through the website''s contact form';

-- Add row level security policy
ALTER TABLE public.email_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for admins (authenticated users with service role can access all rows)
CREATE POLICY admin_policy ON public.email_submissions 
  USING (auth.role() = 'authenticated' OR auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS email_submissions_email_idx ON public.email_submissions (email);

-- Create index on timestamp for sorting
CREATE INDEX IF NOT EXISTS email_submissions_timestamp_idx ON public.email_submissions (timestamp DESC);

-- Insert test email to verify table works
INSERT INTO public.email_submissions (email) 
VALUES ('test@example.com')
ON CONFLICT (email) DO NOTHING;

-- Select to verify
SELECT * FROM public.email_submissions LIMIT 10;

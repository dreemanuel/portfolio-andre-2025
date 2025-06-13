-- Contact Form Submissions Table
-- This table stores all contact form submissions from the portfolio website

CREATE TABLE contact_submissions (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT
);

-- Create indexes for better query performance
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_contact_submissions_submitted_at ON contact_submissions(submitted_at DESC);
CREATE INDEX idx_contact_submissions_ip_address ON contact_submissions(ip_address);

-- Add comments for documentation
COMMENT ON TABLE contact_submissions IS 'Stores contact form submissions from portfolio website';
COMMENT ON COLUMN contact_submissions.id IS 'Unique identifier for each submission';
COMMENT ON COLUMN contact_submissions.name IS 'Full name of the person submitting the form (2-100 chars)';
COMMENT ON COLUMN contact_submissions.email IS 'Email address of the submitter (validated format)';
COMMENT ON COLUMN contact_submissions.subject IS 'Subject line of the message (5-200 chars)';
COMMENT ON COLUMN contact_submissions.message IS 'Main message content (10-2000 chars)';
COMMENT ON COLUMN contact_submissions.submitted_at IS 'Timestamp when the form was submitted';
COMMENT ON COLUMN contact_submissions.ip_address IS 'IP address of the submitter for rate limiting';
COMMENT ON COLUMN contact_submissions.user_agent IS 'Browser user agent string for analytics';

-- Enable Row Level Security (RLS) for enhanced security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows service role to insert and read
CREATE POLICY "Service role can manage contact submissions" ON contact_submissions
  FOR ALL USING (auth.role() = 'service_role');

-- Create a read-only policy for authenticated users (optional, for admin dashboard)
CREATE POLICY "Authenticated users can read contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
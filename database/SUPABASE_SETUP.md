# Supabase Database Setup Guide

This guide will help you set up the Supabase database for the contact form functionality.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Access to your project's environment variables

## Step 1: Create a New Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `portfolio-andre-2025` (or your preferred name)
   - **Database Password**: Create a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be provisioned (2-3 minutes)

## Step 2: Run the Database Schema

1. In your Supabase dashboard, go to the **SQL Editor**
2. Click "New Query"
3. Copy and paste the contents of `database/contact_submissions.sql`
4. Click **Run** to execute the SQL
5. Verify the table was created in the **Table Editor**

## Step 3: Get Your API Keys

1. Go to **Settings** > **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)
   - **service_role key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`)

⚠️ **Important**: The service_role key has admin privileges. Keep it secure!

## Step 4: Configure Environment Variables

### For Local Development:
1. Create a `.env.local` file in your project root:
```bash
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
```

### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the same three variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
4. Make sure to set them for **Production**, **Preview**, and **Development**

## Step 5: Test the Database Connection

You can test the connection using the Supabase dashboard:

1. Go to **Table Editor** > **contact_submissions**
2. Click **Insert** > **Insert row**
3. Add sample data:
   ```
   name: "Test User"
   email: "test@example.com"
   subject: "Test Subject"
   message: "This is a test message"
   ```
4. Click **Save**
5. Verify the row appears in the table

## Security Features Implemented

- **Row Level Security (RLS)**: Enabled on the contact_submissions table
- **Service Role Policy**: Only the service role can insert/read submissions
- **Indexed Columns**: Optimized queries for email, timestamp, and IP address
- **Data Validation**: Enforced at both database and application level

## Monitoring and Analytics

You can monitor form submissions through:

1. **Supabase Dashboard**: Table Editor shows all submissions
2. **SQL Queries**: Use the SQL Editor for custom analytics
3. **API Logs**: Monitor API usage in the Logs section

## Common Issues and Solutions

### Issue: "relation contact_submissions does not exist"
**Solution**: Make sure you ran the SQL schema in Step 2

### Issue: API key errors
**Solution**: Double-check your environment variables match the dashboard exactly

### Issue: RLS policy denying access
**Solution**: Ensure you're using the service_role key for insertions

## Sample Queries

Get recent submissions:
```sql
SELECT name, email, subject, submitted_at 
FROM contact_submissions 
ORDER BY submitted_at DESC 
LIMIT 10;
```

Count submissions by day:
```sql
SELECT DATE(submitted_at) as date, COUNT(*) as submissions
FROM contact_submissions 
GROUP BY DATE(submitted_at)
ORDER BY date DESC;
```

## Next Steps

After completing this setup:
1. Test the contact form on your website
2. Monitor the submissions in Supabase dashboard
3. Set up email notifications (optional)
4. Create analytics dashboard (optional)

---

For support, refer to the [Supabase Documentation](https://supabase.com/docs) or create an issue in this repository.
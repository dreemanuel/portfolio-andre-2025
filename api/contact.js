// /api/contact.js - Vercel Serverless Function for Contact Form
import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

// Rate limiting storage (in-memory for serverless)
const rateLimits = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS_PER_HOUR = 5;

// Input sanitization
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  // Remove HTML tags and dangerous characters
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/[<>'"&]/g, '') // Remove dangerous characters
    .trim();
};

// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

// Rate limiting check
const checkRateLimit = (ip) => {
  const now = Date.now();
  const userRequests = rateLimits.get(ip) || [];
  
  // Remove old requests outside the window
  const recentRequests = userRequests.filter(timestamp => 
    now - timestamp < RATE_LIMIT_WINDOW
  );
  
  // Check if user has exceeded rate limit
  if (recentRequests.length >= MAX_REQUESTS_PER_HOUR) {
    return false;
  }
  
  // Add current request
  recentRequests.push(now);
  rateLimits.set(ip, recentRequests);
  
  return true;
};

// Main handler function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.'
    });
  }
  
  try {
    // Get client IP for rate limiting
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.headers['x-real-ip'] || 
                    req.connection.remoteAddress || 
                    '127.0.0.1';
    
    // Check rate limiting
    if (!checkRateLimit(clientIP)) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.'
      });
    }
    
    // Validate environment variables
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
      console.error('Missing Supabase configuration');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error.'
      });
    }
    
    // Parse and validate request body
    const { name, email, subject, message } = req.body;
    
    // Input validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }
    
    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };
    
    // Validation rules (matching frontend Zod schema)
    const errors = [];
    
    // Name validation
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      errors.push('Name must be between 2 and 100 characters.');
    }
    if (!/^[a-zA-Z\s'-]+$/.test(sanitizedData.name)) {
      errors.push('Name contains invalid characters.');
    }
    
    // Email validation
    if (!isValidEmail(sanitizedData.email)) {
      errors.push('Please enter a valid email address.');
    }
    
    // Subject validation
    if (sanitizedData.subject.length < 5 || sanitizedData.subject.length > 200) {
      errors.push('Subject must be between 5 and 200 characters.');
    }
    
    // Message validation
    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      errors.push('Message must be between 10 and 2000 characters.');
    }
    
    // Return validation errors
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed.',
        errors: errors
      });
    }
    
    // Initialize Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
    
    // Prepare data for database insertion
    const contactData = {
      ...sanitizedData,
      ip_address: clientIP,
      user_agent: req.headers['user-agent'] || null,
      submitted_at: new Date().toISOString()
    };
    
    // Insert into database
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([contactData])
      .select('id')
      .single();
    
    if (error) {
      console.error('Supabase insertion error:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to save your message. Please try again.'
      });
    }
    
    // Success response
    return res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      id: data.id
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred. Please try again.'
    });
  }
}
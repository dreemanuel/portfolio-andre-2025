// Database Connection Test Utility
// Run this script to verify your Supabase connection and table setup

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

async function testDatabaseConnection() {
  console.log('🔍 Testing Supabase Database Connection...\n');

  // Check environment variables
  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.error('❌ Missing environment variables!');
    console.log('Please ensure you have set:');
    console.log('- SUPABASE_URL');
    console.log('- SUPABASE_SERVICE_KEY');
    console.log('\nCheck your .env.local file or environment configuration.');
    process.exit(1);
  }

  console.log('✅ Environment variables found');
  console.log(`📍 Supabase URL: ${SUPABASE_URL}`);
  console.log(`🔑 Service Key: ${SUPABASE_SERVICE_KEY.substring(0, 20)}...`);

  // Initialize Supabase client
  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

  try {
    // Test 1: Check if table exists
    console.log('\n🧪 Test 1: Checking if contact_submissions table exists...');
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('count(*)')
      .limit(1);

    if (error) {
      console.error('❌ Table check failed:', error.message);
      if (error.message.includes('relation "contact_submissions" does not exist')) {
        console.log('\n💡 Solution: Run the SQL schema from database/contact_submissions.sql in your Supabase dashboard');
      }
      return;
    }

    console.log('✅ Table exists and is accessible');

    // Test 2: Insert a test record
    console.log('\n🧪 Test 2: Inserting test record...');
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Database Connection Test',
      message: 'This is a test message to verify the database connection works properly.',
      ip_address: '127.0.0.1',
      user_agent: 'Database Test Script'
    };

    const { data: insertData, error: insertError } = await supabase
      .from('contact_submissions')
      .insert([testData])
      .select('id')
      .single();

    if (insertError) {
      console.error('❌ Insert failed:', insertError.message);
      return;
    }

    console.log(`✅ Test record inserted with ID: ${insertData.id}`);

    // Test 3: Read the test record
    console.log('\n🧪 Test 3: Reading test record...');
    const { data: readData, error: readError } = await supabase
      .from('contact_submissions')
      .select('*')
      .eq('id', insertData.id)
      .single();

    if (readError) {
      console.error('❌ Read failed:', readError.message);
      return;
    }

    console.log('✅ Test record retrieved successfully:');
    console.log(`   Name: ${readData.name}`);
    console.log(`   Email: ${readData.email}`);
    console.log(`   Subject: ${readData.subject}`);
    console.log(`   Submitted: ${readData.submitted_at}`);

    // Test 4: Clean up test record
    console.log('\n🧪 Test 4: Cleaning up test record...');
    const { error: deleteError } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', insertData.id);

    if (deleteError) {
      console.error('❌ Cleanup failed:', deleteError.message);
      console.log(`⚠️  Test record with ID ${insertData.id} was not deleted`);
      return;
    }

    console.log('✅ Test record cleaned up successfully');

    // Final success message
    console.log('\n🎉 All tests passed! Your Supabase database is properly configured.');
    console.log('\n📋 Summary:');
    console.log('   ✅ Environment variables configured');
    console.log('   ✅ Database connection established');
    console.log('   ✅ Table schema is correct');
    console.log('   ✅ Insert operations work');
    console.log('   ✅ Read operations work');
    console.log('   ✅ Delete operations work');
    console.log('\n🚀 Your contact form is ready to go live!');

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    console.log('\n📞 If you need help, check:');
    console.log('   - Supabase project status');
    console.log('   - API key permissions');
    console.log('   - Network connectivity');
  }
}

// Run the test
testDatabaseConnection().catch(console.error);
#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Setup dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, '../.env.local') });

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const adminAccessKey = process.env.ADMIN_ACCESS_KEY;

// Validation checks
if (!supabaseUrl) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL environment variable is missing');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY environment variable is missing');
  process.exit(1);
}

if (!adminAccessKey) {
  console.warn('⚠️ Warning: ADMIN_ACCESS_KEY environment variable is not set');
  console.warn('   This key is required to access the admin endpoints');
}

console.log('🔄 Connecting to Supabase...');

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to create email submissions table
async function createEmailSubmissionsTable() {
  console.log('🔄 Creating email_submissions table if it doesn\'t exist...');

  try {
    // Use raw SQL query with REST API
    const { error } = await supabase.from('email_submissions').insert({
      email: 'test@setup.com',
      timestamp: new Date().toISOString()
    }).select();
    
    // If insert succeeded, the table exists (or was auto-created)
    if (!error) {
      console.log('✅ Table already exists and is working!');
      // Clean up the test entry
      await supabase.from('email_submissions').delete().eq('email', 'test@setup.com');
      return true;
    }
    
    // If table doesn't exist, create it using a stored procedure
    // Note: This might not work depending on your Supabase permissions
    console.log('📝 Creating table using stored procedure...');
    
    // This is tricky because Supabase doesn't expose direct SQL execution in client
    console.log('⚠️ Manual setup may be required. Create this table in the Supabase dashboard:');
    console.log(`
CREATE TABLE IF NOT EXISTS public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referer TEXT
);
    `);
    
    // Try one more time with a different approach for backward compatibility
    console.log('Attempting alternative creation method...');
    
    try {
      // Attempt to use a stored function if available
      const { error: rpcError } = await supabase.rpc('create_email_submissions_table');
      if (!rpcError) {
        console.log('✅ Table created successfully via RPC!');
        return true;
      }
    } catch (rpcErr) {
      console.log('RPC method not available, continuing with alternative approach');
    }
    
    return false;
  } catch (error) {
    console.error('❌ Error creating table:', error);
    return false;
  }
}

// Function to test the email submissions table
async function testEmailSubmissionsTable() {
  console.log('🔄 Testing email_submissions table...');
  
  try {
    // Check if table exists
    const { error: checkError } = await supabase
      .from('email_submissions')
      .select('count', { count: 'exact', head: true });
    
    if (checkError) {
      // If error code is related to table not existing
      if (checkError.code === '42P01' || checkError.message.includes("relation") && checkError.message.includes("does not exist")) {
        console.error('❌ Table does not exist. Creating it now...');
        return await createEmailSubmissionsTable();
      } else {
        console.error('❌ Error accessing table:', checkError);
        return false;
      }
    }
    
    console.log('✅ Table exists and is accessible!');
    return true;
  } catch (error) {
    console.error('❌ Error testing table:', error);
    console.log('Attempting to create the table anyway...');
    return await createEmailSubmissionsTable();
  }
}

// Main function to run the setup
async function setup() {
  console.log('🚀 Starting Freight Radar Supabase setup...');
  
  try {
    // Test connection by checking if we can access Supabase
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('❌ Failed to connect to Supabase:', error.message);
        process.exit(1);
      }
      
      console.log('✅ Successfully connected to Supabase!');
    } catch (err) {
      console.error('❌ Failed to connect to Supabase:', err.message);
      process.exit(1);
    }
    
    // Setup email submissions table
    const tableSetupSuccess = await testEmailSubmissionsTable();
    
    if (!tableSetupSuccess) {
      console.error('❌ Failed to set up email_submissions table');
      process.exit(1);
    }
    
    console.log('\n✅ Supabase setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Make sure your environment variables are set in your deployment environment');
    console.log('2. Test the API endpoint: GET /api/test-supabase?key=YOUR_ADMIN_ACCESS_KEY');
    console.log('3. Test email submission: POST /api/send-email with {"email": "test@example.com"}');
    console.log('4. View submissions at: /admin/email-submissions (password protected)');
    
  } catch (error) {
    console.error('❌ Setup failed with error:', error);
    process.exit(1);
  }
}

// Run the setup
setup();

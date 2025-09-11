#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Setup dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: resolve(__dirname, '../.env.local') });

// Get Supabase credentials
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate credentials
if (!supabaseUrl) {
  console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL is not set in .env.local');
  process.exit(1);
}

if (!supabaseServiceKey) {
  console.error('❌ Error: SUPABASE_SERVICE_ROLE_KEY is not set in .env.local');
  process.exit(1);
}

console.log('🔄 Connecting to Supabase...');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Execute SQL directly to create the table
async function createTable() {
  try {
    console.log('🔄 Creating email_submissions table...');
    
    // Direct SQL execution using Supabase's rest API
    const { error } = await supabase.rpc('create_email_table', {
      table_name: 'email_submissions',
      sql_definition: `
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT NOT NULL UNIQUE,
        timestamp TIMESTAMPTZ DEFAULT now(),
        user_agent TEXT,
        referer TEXT
      `
    });
    
    if (error) {
      console.log('RPC method not available, trying direct SQL execution...');
      
      // Try direct SQL query
      const res = await fetch(`${supabaseUrl}/rest/v1/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseServiceKey,
          'Authorization': `Bearer ${supabaseServiceKey}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          query: `
            CREATE TABLE IF NOT EXISTS public.email_submissions (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              email TEXT NOT NULL UNIQUE,
              timestamp TIMESTAMPTZ DEFAULT now(),
              user_agent TEXT,
              referer TEXT
            );
          `
        })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        console.error('❌ Error executing SQL:', errorData);
        
        console.log('\n📝 Please run the following SQL in the Supabase SQL Editor:');
        console.log(`
CREATE TABLE IF NOT EXISTS public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  timestamp TIMESTAMPTZ DEFAULT now(), 
  user_agent TEXT,
  referer TEXT
);
        `);
        
        return false;
      }
      
      console.log('✅ Table created successfully via direct SQL!');
      return true;
    }
    
    console.log('✅ Table created successfully via RPC!');
    return true;
  } catch (error) {
    console.error('❌ Error creating table:', error);
    
    console.log('\n📝 Please run the following SQL in the Supabase SQL Editor:');
    console.log(`
CREATE TABLE IF NOT EXISTS public.email_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  timestamp TIMESTAMPTZ DEFAULT now(), 
  user_agent TEXT,
  referer TEXT
);
    `);
    
    return false;
  }
}

// Create a test email to verify the table
async function testTableWithInsert() {
  try {
    console.log('🔄 Testing table with test insert...');
    
    // Try inserting a test email
    const { data, error } = await supabase
      .from('email_submissions')
      .insert({
        email: `test_${new Date().getTime()}@example.com`,
        timestamp: new Date().toISOString()
      })
      .select();
    
    if (error) {
      console.error('❌ Test insert failed:', error.message);
      return false;
    }
    
    console.log('✅ Test insert successful! Table is working properly.');
    return true;
  } catch (error) {
    console.error('❌ Error testing table:', error);
    return false;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting Supabase table setup...');
  
  try {
    // Try creating the table
    await createTable();
    
    // Test the table with an insert
    const testSuccess = await testTableWithInsert();
    
    if (testSuccess) {
      console.log('\n✅ Setup completed successfully!');
      console.log('\n📋 Next steps:');
      console.log('1. Test your API endpoint: POST /api/send-email with {"email": "test@example.com"}');
      console.log('2. View submissions at: /admin/email-submissions');
    } else {
      console.log('\n⚠️ Setup might not have completed successfully.');
      console.log('Please check your Supabase project and run the SQL manually if needed.');
    }
  } catch (error) {
    console.error('❌ Error during setup:', error);
    process.exit(1);
  }
}

// Run the main function
main().catch(err => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

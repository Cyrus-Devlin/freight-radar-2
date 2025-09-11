// This script can be run to set up the database in Supabase
// Usage: node setup-supabase.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Error: Missing Supabase environment variables');
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Setting up database in Supabase...');
    
    // Read the SQL setup file
    const sqlFilePath = path.join(__dirname, 'supabase-setup.sql');
    const sqlCommands = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Split the SQL file into separate commands
    const commands = sqlCommands.split(';').filter(cmd => cmd.trim());
    
    // Execute each command
    for (const cmd of commands) {
      if (cmd.trim()) {
        console.log(`Executing SQL command: ${cmd.substring(0, 50)}...`);
        const { error } = await supabase.rpc('exec_sql', { sql_query: cmd });
        
        if (error) {
          console.error('Error executing SQL:', error);
        }
      }
    }
    
    // Create the email_submissions table
    console.log('Creating email_submissions table if it doesn\'t exist...');
    const { error: tableError } = await supabase.rpc('create_email_submissions_table');
    
    if (tableError) {
      console.error('Error creating email_submissions table:', tableError);
    } else {
      console.log('Email submissions table created or already exists');
    }
    
    console.log('Database setup complete!');
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}

setupDatabase();

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    // Check for admin access key
    const { searchParams } = new URL(request.url);
    const accessKey = searchParams.get('key');
    
    if (accessKey !== process.env.ADMIN_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase environment variables' },
        { status: 500 }
      );
    }
    
    // Create Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // SQL to create the table if it doesn't exist
    const sql = `
      CREATE TABLE IF NOT EXISTS email_submissions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email TEXT NOT NULL,
        timestamp TIMESTAMPTZ DEFAULT NOW(),
        user_agent TEXT,
        referer TEXT
      );
    `;
    
    // Execute SQL
    const { error } = await supabase.rpc('exec_sql', { sql_query: sql });
    
    if (error) {
      console.error('Error creating table:', error);
      return NextResponse.json(
        { error: 'Failed to create table', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Table created or already exists' });
  } catch (error: any) {
    console.error('Error setting up database:', error);
    return NextResponse.json(
      { error: 'Failed to set up database', details: error.message },
      { status: 500 }
    );
  }
}

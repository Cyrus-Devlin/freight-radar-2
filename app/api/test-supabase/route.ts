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
    
    // Initialize Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
    
    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json(
        { error: 'Missing Supabase environment variables' },
        { status: 500 }
      );
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Test the connection
    const { data, error } = await supabase.from('email_submissions').select('count', { count: 'exact', head: true });
    
    if (error) {
      console.error('Error connecting to Supabase:', error);
      
      // Try to create the table if it doesn't exist
      if (error.code === '42P01') { // Table doesn't exist
        return NextResponse.json({
          success: false,
          message: 'Email submissions table does not exist. Please run the setup script.',
          error: error.message
        });
      }
      
      return NextResponse.json(
        { error: 'Failed to connect to Supabase', details: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Supabase',
      data
    });
  } catch (error: any) {
    console.error('Error testing Supabase connection:', error);
    return NextResponse.json(
      { error: 'Failed to test Supabase connection', details: error.message },
      { status: 500 }
    );
  }
}

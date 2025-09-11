import { NextResponse } from 'next/server';
import { emailStore } from '@/lib/email-store';

export async function POST(request: Request) {
  try {
    // Parse request body
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    // Store the email submission with metadata in Supabase
    await emailStore.addSubmission({
      email: email.trim(),
      timestamp: new Date().toISOString(),
      user_agent: request.headers.get('user-agent') || undefined,
      referer: request.headers.get('referer') || undefined
    });

    console.log(`Email address stored in Supabase: ${email}`);
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Email stored successfully' 
    });
  } catch (error: any) {
    console.error('Error storing email:', error);
    return NextResponse.json(
      { error: 'Failed to store email', details: error.message },
      { status: 500 }
    );
  }
}

// GET endpoint for retrieving stored emails (password protected)
export async function GET(request: Request) {
  try {
    // Basic security: Check for a simple password in query param
    // In production, you'd want proper authentication
    const { searchParams } = new URL(request.url);
    const accessKey = searchParams.get('key');
    
    // Simple secret key verification
    // This is a basic protection - replace with proper auth in production
    if (accessKey !== process.env.ADMIN_ACCESS_KEY) {
      return NextResponse.json(
        { error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    // Get submissions from Supabase
    const submissions = await emailStore.getSubmissionsSorted();
    
    return NextResponse.json({ 
      success: true,
      count: submissions.length,
      submissions 
    });
  } catch (error: any) {
    console.error('Error retrieving emails:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve emails', details: error.message },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Get the password from the request body
    const { password } = await request.json();
    
    // Check if password is provided
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }
    
    // Get the admin password from environment variables
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    // Validate the password
    if (!adminPassword || password !== adminPassword) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }
    
    // Set the authentication cookie
    cookies().set('admin-auth', adminPassword, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 hour
      path: '/',
    });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error during admin login:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  // Remove the admin authentication cookie
  cookies().delete('admin-auth');
  
  // Redirect to login page
  return NextResponse.redirect(new URL('/admin/login', request.url));
}

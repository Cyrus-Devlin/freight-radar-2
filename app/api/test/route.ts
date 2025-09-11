import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'API is working correctly',
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    return NextResponse.json({ 
      status: 'ok',
      message: 'API is working correctly',
      receivedData: data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Error processing request',
      error: (error as Error).message
    }, { status: 400 });
  }
}

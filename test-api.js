// Test script for the send-email API endpoint
import fetch from 'node-fetch';

async function testEmailAPI() {
  try {
    console.log('Testing /api/send-email endpoint...');
    
    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `test_${Date.now()}@example.com`,
      }),
    });
    
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

testEmailAPI();

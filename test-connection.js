// Test script for API endpoint
import http from 'http';
import https from 'https';

function testConnection() {
  console.log('Testing connection to localhost:3000...');
  
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'GET',
    timeout: 3000 // 3 second timeout
  }, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    console.log(`Headers: ${JSON.stringify(res.headers)}`);
    
    res.on('data', (chunk) => {
      console.log(`Received ${chunk.length} bytes of data`);
    });
    
    res.on('end', () => {
      console.log('Connection successful!');
      testEmailApi();
    });
  });
  
  req.on('error', (error) => {
    console.error(`Connection error: ${error.message}`);
    process.exit(1);
  });
  
  req.on('timeout', () => {
    console.error('Connection timed out');
    req.destroy();
    process.exit(1);
  });
  
  req.end();
}

function testEmailApi() {
  console.log('\nTesting email API endpoint...');
  
  const data = JSON.stringify({
    email: `test_${Date.now()}@example.com`
  });
  
  const req = http.request({
    hostname: 'localhost',
    port: 3000,
    path: '/api/send-email',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    },
    timeout: 5000 // 5 second timeout
  }, (res) => {
    console.log(`Status Code: ${res.statusCode}`);
    
    let responseData = '';
    
    res.on('data', (chunk) => {
      responseData += chunk;
    });
    
    res.on('end', () => {
      console.log('Response data:');
      try {
        const parsedData = JSON.parse(responseData);
        console.log(JSON.stringify(parsedData, null, 2));
      } catch (e) {
        console.log(responseData);
      }
    });
  });
  
  req.on('error', (error) => {
    console.error(`API request error: ${error.message}`);
  });
  
  req.on('timeout', () => {
    console.error('API request timed out');
    req.destroy();
  });
  
  req.write(data);
  req.end();
}

// Start the test
testConnection();

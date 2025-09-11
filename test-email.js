const testEmailSubmission = async () => {
  try {
    console.log('Sending test email submission...');
    const response = await fetch('http://localhost:3001/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: 'test@example.com' }),
    });

    const data = await response.json();
    console.log('Response:', data);
    
    if (response.ok) {
      console.log('✅ Test successful! Check your email inbox at cyrus@myfreightradar.com');
    } else {
      console.log('❌ Test failed:', data.error);
    }
  } catch (error) {
    console.error('❌ Test failed with exception:', error);
  }
};

testEmailSubmission();

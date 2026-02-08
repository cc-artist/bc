const http = require('http');

// Test health endpoint
http.get('http://localhost:3001/health', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Health API Response:', data);
  });
}).on('error', (err) => {
  console.error('Error calling health API:', err.message);
});

// Test dashboard endpoint
setTimeout(() => {
  http.get('http://localhost:3001/api/admin/dashboard', (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Dashboard API Response:', data);
    });
  }).on('error', (err) => {
    console.error('Error calling dashboard API:', err.message);
  });
}, 1000);
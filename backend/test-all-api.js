const http = require('http');

// Test functions
async function testHealth() {
  console.log('Testing Health API...');
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3001/health', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.status === 'ok') {
            console.log('✓ Health API: OK');
            resolve(true);
          } else {
            console.log('✗ Health API: Failed');
            resolve(false);
          }
        } catch (error) {
          console.log('✗ Health API: Failed to parse response');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`✗ Health API: Error - ${err.message}`);
      resolve(false);
    });
  });
}

async function testLogin() {
  console.log('\nTesting Login API...');
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request('http://localhost:3001/api/admin/login', options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            console.log('✓ Login API: OK');
            resolve(result.sessionId);
          } else {
            console.log('✗ Login API: Failed');
            resolve(null);
          }
        } catch (error) {
          console.log('✗ Login API: Failed to parse response');
          resolve(null);
        }
      });
    });
    
    req.write(JSON.stringify({ username: 'admin', password: 'password' }));
    req.end();
    
    req.on('error', (err) => {
      console.log(`✗ Login API: Error - ${err.message}`);
      resolve(null);
    });
  });
}

async function testDashboard() {
  console.log('\nTesting Dashboard API...');
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3001/api/admin/dashboard', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.status) {
            console.log('✓ Dashboard API: OK');
            resolve(true);
          } else {
            console.log('✗ Dashboard API: Failed');
            resolve(false);
          }
        } catch (error) {
          console.log('✗ Dashboard API: Failed to parse response');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`✗ Dashboard API: Error - ${err.message}`);
      resolve(false);
    });
  });
}

async function testPayments() {
  console.log('\nTesting Payments API...');
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3001/api/admin/payments', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.payments && result.payments.length > 0) {
            console.log('✓ Payments API: OK');
            resolve(true);
          } else {
            console.log('✗ Payments API: Failed');
            resolve(false);
          }
        } catch (error) {
          console.log('✗ Payments API: Failed to parse response');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`✗ Payments API: Error - ${err.message}`);
      resolve(false);
    });
  });
}

async function testPaymentDetail() {
  console.log('\nTesting Payment Detail API...');
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3001/api/admin/payments/PAY20260207001', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.id === 'PAY20260207001') {
            console.log('✓ Payment Detail API: OK');
            resolve(true);
          } else {
            console.log('✗ Payment Detail API: Failed');
            resolve(false);
          }
        } catch (error) {
          console.log('✗ Payment Detail API: Failed to parse response');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log(`✗ Payment Detail API: Error - ${err.message}`);
      resolve(false);
    });
  });
}

async function testLogout(sessionId) {
  if (!sessionId) {
    console.log('\nSkipping Logout API test - No valid session');
    return Promise.resolve(true);
  }
  
  console.log('\nTesting Logout API...');
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request('http://localhost:3001/api/admin/logout', options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.success) {
            console.log('✓ Logout API: OK');
            resolve(true);
          } else {
            console.log('✗ Logout API: Failed');
            resolve(false);
          }
        } catch (error) {
          console.log('✗ Logout API: Failed to parse response');
          resolve(false);
        }
      });
    });
    
    req.write(JSON.stringify({ sessionId }));
    req.end();
    
    req.on('error', (err) => {
      console.log(`✗ Logout API: Error - ${err.message}`);
      resolve(false);
    });
  });
}

// Main test function
async function runAllTests() {
  console.log('Running all API tests...');
  console.log('='.repeat(50));
  
  const results = [];
  
  // Run tests in sequence
  results.push(await testHealth());
  results.push(await testDashboard());
  results.push(await testPayments());
  results.push(await testPaymentDetail());
  
  const sessionId = await testLogin();
  results.push(sessionId !== null);
  
  results.push(await testLogout(sessionId));
  
  console.log('\n' + '='.repeat(50));
  console.log('Test Results:');
  console.log(`Passed: ${results.filter(r => r).length}/${results.length}`);
  console.log(`Failed: ${results.filter(r => !r).length}/${results.length}`);
  
  if (results.every(r => r)) {
    console.log('\n🎉 All tests passed!');
  } else {
    console.log('\n❌ Some tests failed!');
  }
}

// Run the tests
runAllTests();
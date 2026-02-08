const http = require('http');

// Test admin.html route
http.get('http://localhost:3001/admin.html', (res) => {
  console.log('admin.html - Status Code:', res.statusCode);
  console.log('admin.html - Content-Type:', res.headers['content-type']);
}).on('error', (err) => {
  console.error('Error calling admin.html:', err.message);
});

// Test admin/index.html route
setTimeout(() => {
  http.get('http://localhost:3001/admin/index.html', (res) => {
    console.log('admin/index.html - Status Code:', res.statusCode);
    console.log('admin/index.html - Content-Type:', res.headers['content-type']);
  }).on('error', (err) => {
    console.error('Error calling admin/index.html:', err.message);
  });
}, 500);

// Test /admin redirect
setTimeout(() => {
  http.get('http://localhost:3001/admin', { followRedirects: false }, (res) => {
    console.log('/admin redirect - Status Code:', res.statusCode);
    console.log('/admin redirect - Location:', res.headers.location);
  }).on('error', (err) => {
    console.error('Error calling /admin:', err.message);
  });
}, 1000);
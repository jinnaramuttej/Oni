
const http = require('http');

const data = JSON.stringify({
  prompt: "make a luxury hotel website",
  messages: [],
  currentHtml: ""
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Headers:', res.headers);
  
  res.on('data', (chunk) => {
    console.log('Chunk:', chunk.toString());
  });
  
  res.on('end', () => {
    console.log('Response ended');
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.write(data);
req.end();

import http from 'http';
http.get('http://localhost:3000/', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => console.log(data));
}).on('error', (err) => console.log(err));

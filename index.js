const { createServer: s } = require('http');
const { parse: p } = require('url');
const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const parsedData = JSON.parse(data);

s((req, res) => {
  const { pathname } = p(req.url, true);
  console.log(pathname);

  if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);
  } else {
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end('<h1>Hello World</h1>');
  }
}).listen(8000, err => {
  console.log('Listening on port 8000...');
});

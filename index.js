const { createServer: s } = require('http');
const { parse: p } = require('url');
const fs = require('fs');

const replaceHtml = require('./modules/replaceTemplate');

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template_overview.html`,
  'utf-8'
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template_card.html`,
  'utf-8'
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template_product.html`,
  'utf-8'
);
const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const parsedData = JSON.parse(data);
const port = process.env.PORT || 3000;

s((req, res) => {
  const { pathname, query } = p(req.url, true);
  const id = query.id;

  if (pathname === '/' || pathname === '/overview') {
    const htmlCards = parsedData
      .map(card => {
        return replaceHtml(templateCard, card);
      })
      .join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', htmlCards);

    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(output);
  } else if (pathname === '/product') {
    const product = parsedData[id];
    const output = replaceHtml(templateProduct, product);
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    res.end(output);
  } else if (pathname === '/api') {
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
}).listen(port, err => {
  console.log(`Listening on port ${port}...`);
});

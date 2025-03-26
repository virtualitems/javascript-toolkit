const http = require('node:http');

const cache = [];

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * @description GET method handler
 *
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function get(req, res) {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Cache-Control': 'no-store',
    'Connection': 'keep-alive',
    'Content-Type': 'text/csv',
    'Transfer-Encoding': 'chunked',
  });

  // stream rows
  for (let i = 0; i < cache.length; i += 1) {
    await delay(500); // simulate heavy processing
    res.write(cache[i]);
  }

  // close connection
  res.end();
}

/**
 * @description POST method handler
 *
 * @param {import('node:http').IncomingMessage} req
 * @param {import('node:http').ServerResponse} res
 */
async function post(req, res) {

  cache.splice(0, cache.length); // clear cache

  req.on('data', (chunk) => {
    cache.push(chunk);
  });

  req.on('error', (err) => {
    console.error(err);
    res.writeHead(500).end();
  });

  req.on('end', () => {
    res.writeHead(201, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'accept': 'text/csv',
      'connection': 'keep-alive',
    }).end();
  });
}

const server = http.createServer(async (req, res) => {

  if (req.method === 'GET') {
    await get(req, res);
    return;
  }

  if (req.method === 'POST') {
    await post(req, res);
    return;
  }

  res.writeHead(405).end();
});

server.listen(80, () => {
  console.log('Server running at http://localhost');
});

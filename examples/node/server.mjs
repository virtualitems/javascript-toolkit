import http from 'http';

const port = process.argv[2] ?? 80;

const server = http.createServer((req, res) => {

  if (req.method !== 'GET') {
    res.statusCode = 405; // Method Not Allowed
    res.end();
    return;
  }

  const date = new Date();
  console.debug(date);

  // shared headers
  res.statusCode = 200;
  res.setHeader('Connection', 'close');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Language', 'es-CO');
  res.setHeader('Transfer-Encoding', 'chunked');

  if (req.url.endsWith('/api')) {
    // api response
    const timeIsoString = date.toISOString();
    const data = { date: timeIsoString };
    const json = JSON.stringify(data);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(json);
    return;
  }

  // default response
  const timeString = date.toLocaleString('es-CO', { timeZone: 'America/Bogota' });

  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(timeString);
});

server.listen(port, () => console.log(`http://localhost:${port}`));
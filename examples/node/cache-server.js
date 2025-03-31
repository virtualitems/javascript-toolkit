const http = require("http");

const port = process.argv[2] ?? 80;

const html = (text) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      font-family: sans-serif;
      font-size: 2rem;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <a href="/">${text}</a>
  <script>setInterval(() => fetch('http://localhost'), 1000);</script>
</body>
</html>
`;

// Etag es un identificador único para la versión del recurso (simula un hash)
let etag = Buffer.from(Date.now().toString()).toString("base64");

setInterval(() => {
  // cada 30 segundos cambia el etag (simulando un cambio en el recurso)
  etag = Buffer.from(Date.now().toString()).toString("base64");
  console.log("ETag:", etag);
}, 30 * 1000);

const server = http.createServer((req, res) => {
  if (req.headers["if-none-match"] === etag) {
    // esto debería hacerlo el servidor de aplicaciones
    res.writeHead(304);
    res.end();
    console.log("304 Not Modified");
    return;
  }

  const date = new Date().toLocaleTimeString("es-CO", {
    timeZone: "America/Bogota",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  res.statusCode = 200;
  res.setHeader("Cache-Control", "public, max-age=5, immutable");
  res.setHeader("Content-Type", "text/html");
  res.setHeader("ETag", etag);
  res.end(html(date));
  console.log(date);
});

server.listen(port, () => console.log(`http://localhost:${port}`));

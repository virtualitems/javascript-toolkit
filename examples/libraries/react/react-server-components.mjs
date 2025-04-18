import { createServer } from 'node:http';
import { createElement } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { readFileSync } from 'node:fs';

function App() {
  return createElement(
    'html',
    null,
    createElement('head', null, createElement('title', null, 'React Server Render')),
    createElement(
      'body',
      null,
      createElement('h1', null, 'Renderizado con React y Node HTTP'),
      createElement('div', { id: 'root' }, createElement(Counter)),
    ),
  );
}

function Counter() {
  return createElement(
    'div',
    null,
    createElement('button', null, 'Click me!'),
    createElement('span', null, ' Count: 0'),
  );
}

const server = createServer();

server.on('request', (req, res) => {
  if (req.url === '/client.js') {
    res.writeHead(200, { 'content-type': 'application/javascript' });
    res.end(readFileSync('./client.js'));
    return;
  }

  if (req.url !== '/') {
    res.writeHead(404);
    res.end();
    return;
  }

  const stream = renderToPipeableStream(createElement(App), {
    bootstrapModules: [
      '/client.js',
    ],
    onShellReady() {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      stream.pipe(res);
    },
    onError(err) {
      console.error(err);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error en el servidor');
    },
  });
});

server.listen(80, () => console.log('http://localhost'));

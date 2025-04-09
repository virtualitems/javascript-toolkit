import { createServer } from 'node:http';
import { createElement } from 'react';
import { renderToPipeableStream } from 'react-dom/server';

export default function App() {
  return createElement(
    'html',
    null,
    createElement('head', null, createElement('title', null, 'React Server Render')),
    createElement(
      'body',
      null,
      createElement('h1', null, 'Renderizado con React y Node HTTP'),
      createElement(List),
    ),
  );
}

function List() {
  const items = ['Primero', 'Segundo', 'Tercero'];

  return createElement(
    'ul',
    null,
    ...items.map((item, i) => createElement('li', { key: i }, item)),
  );
}

const server = createServer();

server.on('request', (req, res) => {
  if (req.url === '/') {
    const stream = renderToPipeableStream(createElement(App), {
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
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('No encontrado');
  }
});

server.listen(80, () => console.log('http://localhost'));

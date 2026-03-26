import { createServer } from 'node:http';
import { createElement } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { readFileSync } from 'node:fs';

/**
 * @param {object} props
 * @param {{ name: string, email: string }[]} props.contacts
 */
function App({ contacts }) {
  return createElement(
    'html',
    null,
    createElement(
      'head',
      null,
      createElement('title', null, 'React Server Render'),
      createElement('meta', { charSet: 'utf-8' }),
      createElement('meta', { name: 'viewport', content: 'width=device-width' }),
      createElement('script', { type: 'application/json', id: 'json-contacts' }, JSON.stringify(contacts)),
    ),
    createElement(
      'body',
      null,
      createElement('h1', null, 'Renderizado con React y Node HTTP'),
      createElement('div', { id: 'root' }, createElement(Table, { contacts })),
    ),
  );
}

/**
 * @param {object} props
 * @param {{ name: string, email: string }[]} props.contacts
 */
function Table({ contacts }) {
  return createElement(
    'table',
    {
      style: {
        borderCollapse: 'collapse',
        width: '100%',
        cursor: 'pointer',
      },
    },
    createElement(
      'thead',
      null,
      createElement(
        'tr',
        null,
        createElement('th', null, 'Nombre'),
        createElement('th', null, 'Email'),
      ),
    ),
    createElement(
      'tbody',
      null,
      contacts.map(contact =>
        createElement(
          'tr',
          { key: contact.email },
          createElement('td', null, contact.name),
          createElement('td', null, contact.email),
        ),
      ),
    ),
  );
}

const server = createServer();

async function getContacts() {
  return [
    { name: 'Jane Doe', email: 'jane.doe@example.com' },
    { name: 'Mary Jane', email: 'mary.jane@example.com' },
    { name: 'Diana Prince', email: 'diana.prince@example.com' },
    { name: 'Natasha Romanoff', email: 'natasha.romanoff@example.com' },
  ];
}

server.on('request', async (req, res) => {
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

  const contacts = await getContacts();

  const stream = renderToPipeableStream(createElement(App, { contacts }), {
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

/* Browser client example:

const source = new EventSource('http://localhost');
source.onmessage = (event) => console.log(event.data);
source.onerror = (err) => console.error(err);
source.onopen = () => console.log('Connection opened');
source.addEventListener('end', (event) => {
  console.log(event.data);
  source.close();
  console.warn('Connection closed');
});

*/

const http = require('http');

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Server-Sent Event (SSE) formatted string
 *
 * id: 0\n
 *
 * event: greeting\n
 *
 * data: greetings from the server\n\n
 *
 * @param {string} id - The event ID.
 * @param {string} data - The event data.
 * @param {string} [event] - The event type.
 *
 * @returns {string} The Server-Sent Event (SSE) formatted string
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource
 */
function sse(id, data, event) {
  if ('string' !== typeof id) {
    throw new TypeError('id must be a string');
  }

  if ('string' !== typeof data) {
    throw new TypeError('data must be a string');
  }

  let str = '';

  str += `id: ${id}\n`;

  if ('string' === typeof event) {
    str += `event: ${event}\n`;
  }

  str += `data: ${data}\n`;

  return `${str}\n`;
}

const server = http.createServer(async (_, res) => {
  res.writeHead(200, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Cache-Control': 'no-store',
    'Connection': 'keep-alive',
    'Content-Type': 'text/event-stream',
  });

  for (let i = 1; i <= 4; i += 1) {
    await delay(500);
    res.write(sse(i.toString(), Date.now().toString()));
  }

  res.write(sse('-', 'bye', 'end'));
  res.end();
});

server.listen(80, () => console.log('http://localhost'));

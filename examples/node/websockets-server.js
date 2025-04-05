const http = require('node:http');
const crypto = require('node:crypto');

const port = 80;

const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const server = http.createServer();

server.on('request', (req, res) => {
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>WebSocket Server</h1>
    <script>
      const socket = new WebSocket('ws://localhost:${port}');
      socket.addEventListener('open', event => {
        console.log('WebSocket connection opened');
      });
      socket.addEventListener('message', event => {
        console.log('Message from server:', event.data);
      });
      socket.addEventListener('close', event => {
        console.log('WebSocket connection closed');
      });
      socket.addEventListener('error', error => {
        console.error('WebSocket error:', error);
      });
    </script>
  </body>
  </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(html);
});

server.on('upgrade', (req, socket, head) => {
  const key = req.headers['sec-websocket-key'];

  if (!key) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    return;
  }

  const acceptKey = crypto
    .createHash('sha1')
    .update(key + guid)
    .digest('base64');

  socket.write(
    'HTTP/1.1 101 Switching Protocols\r\n' +
      'Upgrade: websocket\r\n' +
      'Connection: Upgrade\r\n' +
      `Sec-WebSocket-Accept: ${acceptKey}\r\n` +
      '\r\n',
  );

  socket.on('data', buffer => {
    console.log('buffer', buffer);
  });

  socket.on('error', err => {
    console.error('Socket error:', err);
  });
});

server.on('error', err => {
  console.error('Server error:', err);
});

server.listen(port, () => console.log(`http://localhost:${port}`));

/*

// Handle Upgrade requests for WebSocket.
server.on('upgrade', (req, socket, head) => {
  // Verify that the necessary header is present.
  const key = req.headers['sec-websocket-key'];
  if (!key) {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    return;
  }

  // Create the Sec-WebSocket-Accept key using SHA-1.
  const hash = crypto.createHash('sha1');
  hash.update(key + '258EAFA5-E914-47DA-95CA-C5AB0DC85B11');
  const acceptKey = hash.digest('base64');

  // Send back the switching protocols response.
  const responseHeaders = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${acceptKey}`,
  ];

  socket.write(responseHeaders.join('\r\n') + '\r\n\r\n');

  // Now that the connection is upgraded, handle incoming data frames.
  socket.on('data', buffer => {
    // This simple example assumes the incoming message is a single, unfragmented text frame.
    const firstByte = buffer[0];
    const opCode = firstByte & 0x0f;
    const secondByte = buffer[1];
    let payloadLength = secondByte & 0x7f;
    let offset = 2;

    // Handle extended payload lengths.
    if (payloadLength === 126) {
      payloadLength = buffer.readUInt16BE(2);
      offset += 2;
    } else if (payloadLength === 127) {
      // For brevity, this example doesn't support 64-bit length payloads.
      payloadLength = buffer.readUInt32BE(2);
      offset += 8;
    }

    // Retrieve mask key and payload.
    const mask = buffer.slice(offset, offset + 4);
    offset += 4;
    const payload = buffer.slice(offset, offset + payloadLength);

    // Unmask the payload.
    let decoded = Buffer.alloc(payload.length);
    for (let i = 0; i < payload.length; i++) {
      decoded[i] = payload[i] ^ mask[i % 4];
    }

    console.log('Received:', decoded.toString());

    // Prepare a simple echo response.
    const response = `Echo: ${decoded.toString()}`;
    const responseBuffer = createFrame(response);
    socket.write(responseBuffer);
  });
});

function createFrame(data) {
  // Create a WebSocket frame for text data.
  const payload = Buffer.from(data);
  const payloadLength = payload.length;
  let frame = [];

  // Set FIN bit and opcode for text frame.
  const firstByte = 0x80 | 0x1; // FIN + text frame opcode
  frame.push(firstByte);

  // Handle payload length.
  if (payloadLength < 126) {
    frame.push(payloadLength);
  } else if (payloadLength < 65536) {
    frame.push(126, (payloadLength >> 8) & 0xff, payloadLength & 0xff);
  } else {
    // Not handling payloads > 65535 in this simple example.
    frame.push(127);
    frame.push(0, 0, 0, 0);
    frame.push(
      (payloadLength >> 24) & 0xff,
      (payloadLength >> 16) & 0xff,
      (payloadLength >> 8) & 0xff,
      payloadLength & 0xff,
    );
  }

  // Combine frame header and payload.
  return Buffer.concat([Buffer.from(frame), payload]);
}

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
*/
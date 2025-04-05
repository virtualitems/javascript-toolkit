const http = require('node:http');
const crypto = require('node:crypto');

const port = 80;

const guid = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

const server = http.createServer();

const sockets = {
  frames: {
    optCodes: Object.freeze({
      CONTINUATION: 0,
      TEXT: 1,
      BINARY: 2,
      CLOSE: 8,
      PING: 9,
      PONG: 10,
    }),
    decode: {
      segments: frame => {
        const byte1 = frame[0]; // 1 byte
        const byte2 = frame[1]; // 1 byte
        const maskKey = frame.slice(2, 6); // 4 bytes
        const payload = frame.slice(6); // remaining bytes

        return {
          isFIN: byte1 & 0x80 ? true : false, // 0x80 = 0b10000000
          opcode: byte1 & 0x0f, // 0x0f = 0b00001111
          maskKey: maskKey,
          hasMask: byte2 & 0x80 ? true : false, // 0x80 = 0b10000000
          payload: {
            length: byte2 & 0x7f, // 0x7f = 0b01111111
            data: payload,
          },
        };
      },
      text: (maskKey, length, data, textEncoding = 'utf8') => {
        const buff = Buffer.alloc(length);

        for (let i = 0; i < length; i++) {
          buff[i] = data[i] ^ maskKey[i % 4];
        }

        return buff.toString(textEncoding);
      },
    },
  },
};

// HTTP requests
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
        socket.send('Hello from client!');
      });
      socket.addEventListener('message', event => {
        console.log('Message from server:', event.data);
      });
      socket.addEventListener('close', event => {
        console.log('WebSocket connection closed');
      });
      socket.addEventListener('error', error => {
        console.error(error);
      });
    </script>
  </body>
  </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200);
  res.end(html);
});

// WebSocket upgrade requests
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
    const frameSegments = sockets.frames.decode.segments(buffer);

    const { opcode, payload, maskKey } = frameSegments;
    const { length, data } = payload;

    let decoded = null;

    if (opcode === sockets.frames.optCodes.TEXT) {
      decoded = sockets.frames.decode.text(maskKey, length, data);
    }

    console.log('Decoded message:', decoded);
  });

  socket.on('error', err => {
    console.error(err);
  });

  socket.on('close', () => {
    console.log('Socket closed');
  });

  socket.on('end', () => {
    console.log('Socket ended');
  });

  setInterval(() => {
    socket.write(
      Buffer.from([
        0b10000001, // FIN=1 + opcode=1 (text)
        0b00001010, // length=10 (bytes)
        ...Buffer.from('Greetings!', 'utf8')
      ]),
    )
  }, 2000);
});

// Server error handling
server.on('error', err => {
  console.error('Server error:', err);
});

// Start the server
server.listen(port, () => console.log(`http://localhost:${port}`));

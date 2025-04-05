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
    const parseFrame = buffer => {
      const firstByte = buffer[0];
      const opcode = firstByte & 0x0f;

      const secondByte = buffer[1];
      const masked = (secondByte & 0x80) === 0x80;
      let payloadLength = secondByte & 0x7f;

      let offset = 2;

      if (payloadLength === 126) {
        payloadLength = buffer.readUInt16BE(offset);
        offset += 2;
      } else if (payloadLength === 127) {
        payloadLength = Number(buffer.readBigUInt64BE(offset));
        offset += 8;
      }

      if (masked) {
        const maskingKey = buffer.slice(offset, offset + 4);
        offset += 4;

        const payload = buffer.slice(offset, offset + payloadLength);
        const unmaskedPayload = Buffer.alloc(payloadLength);

        for (let i = 0; i < payloadLength; i++) {
          unmaskedPayload[i] = payload[i] ^ maskingKey[i % 4];
        }

        return { opcode, payload: unmaskedPayload.toString() };
      } else {
        return {
          opcode,
          payload: buffer.slice(offset, offset + payloadLength).toString(),
        };
      }
    };

    let messageBuffer = Buffer.alloc(0);

    messageBuffer = Buffer.concat([messageBuffer, buffer]);

    while (messageBuffer.length > 2) {
      const secondByte = messageBuffer[1];
      let payloadLength = secondByte & 0x7f;
      let headerLength = 2;

      if (payloadLength === 126) {
        headerLength += 2;
      } else if (payloadLength === 127) {
        headerLength += 8;
      }

      if (messageBuffer.length < headerLength) break;

      if (payloadLength === 126) {
        payloadLength = messageBuffer.readUInt16BE(2);
      } else if (payloadLength === 127) {
        payloadLength = Number(messageBuffer.readBigUInt64BE(2));
      }

      const totalFrameLength = headerLength + (secondByte & 0x80 ? 4 : 0) + payloadLength;

      if (messageBuffer.length < totalFrameLength) break;

      const frame = parseFrame(messageBuffer.slice(0, totalFrameLength));
      messageBuffer = messageBuffer.slice(totalFrameLength);

      if (frame.opcode === 0x8) {
        socket.end();
        return;
      } else if (frame.opcode === 0x1) {
        console.log('Payload:', frame.payload);
      }
    }
  });

  socket.on('error', err => {
    console.error('Socket error:', err);
  });
});

server.on('error', err => {
  console.error('Server error:', err);
});

server.listen(port, () => console.log(`http://localhost:${port}`));

const fs = require('fs');

function read(bufferSize, path) {
  const stream = fs.createReadStream(path, {
    highWaterMark: bufferSize,
    encoding: 'utf8',
  });

  stream.on('data', (chunk) => {
    console.log(chunk.toString());
  });

  stream.on('end', () => {
    console.log('-- end --');
  });

  stream.on('error', (err) => {
    console.error(err);
  });
}

function write(bufferSize, path) {
  const stream = fs.createWriteStream(path, {
    highWaterMark: bufferSize,
    encoding: 'utf8',
  });

  stream.on('error', (err) => {
    console.error(err);
  });

  process.stdin.on('data', (chunk) => {
    const canWrite = stream.write(chunk);
    if (!canWrite) {
      process.stdin.pause(); // Pause stdin if the buffer is full
      console.log('>> pause');
    }
  });

  stream.on('drain', () => {
    process.stdin.resume(); // Resume stdin when the buffer is drained
    console.log('>> resume');
  });

  process.stdin.on('end', () => {
    stream.end();
  });
}

// Usage:
// node this-file.js -r 4 file
// node this-file.js -w 4 file

const action = process.argv[2];
const bufferSize = Number(process.argv[3]);
const path = process.argv[4];

if (action === '-r') {
  read(bufferSize, path);
  return;
}

if (action === '-w') {
  write(bufferSize, path);
  return;
}

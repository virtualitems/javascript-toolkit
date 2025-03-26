const fs = require('fs');
const readline = require('node:readline');

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

  stream.on('drain', () => {
    process.stdin.resume(); // Resume stdin when the buffer is drained
    console.log('>> resume');
  });

  process.stdin.on('data', (chunk) => {
    const canWrite = stream.write(chunk);
    if (!canWrite) {
      process.stdin.pause(); // Pause stdin if the buffer is full
      console.log('>> pause');
    }
  });

  process.stdin.on('end', () => {
    stream.end();
    console.log('-- end --');
  });

  process.stdin.on('error', (err) => {
    stream.end();
    console.error(err);
  });

  process.stdin.on('close', () => {
    stream.end();
    console.log('-- close --');
  });
}

function readLines(path) {
  const stream = fs.createReadStream(path, {
    encoding: 'utf8',
  });

  const laner = readline.createInterface({
    input: stream,
    crlfDelay: Infinity, // Handles both Windows (\r\n) and Unix (\n) line endings
  });

  laner.on('line', (line) => {
    console.log('·', line); // Process each line
  });

  laner.on('close', () => {
    console.log('-- end --');
  });

  laner.on('pause', () => {
    console.log('>> pause');
  });

  laner.on('resume', () => {
    console.log('>> resume');
  });

  laner.on('error', (err) => {
    console.error(err);
  });
}

// Usage:
// node this-file.js -r file.txt 4
// node this-file.js -w file.txt 4
// node this-file.js -l file.txt

const action = process.argv[2];
const path = process.argv[3];
const bufferSize = Number(process.argv[4]);

if (action === '-r') {
  read(bufferSize, path);
  return;
}

if (action === '-w') {
  write(bufferSize, path);
  return;
}

if (action === '-l') {
  readLines(path);
  return;
}

console.log('Invalid action');

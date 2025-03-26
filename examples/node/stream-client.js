const http = require('node:http');

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * @param {import('node:http').RequestOptions} options
 * @param {string[]} data
 */
async function store(options, data) {
  const req = http.request(options, (res) => {
    res.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    res.on('end', () => {
      console.log('-- end --');
    });
  });

  req.on('error', (err) => {
    console.error(err);
  });

  for (const item of data) { // Send chunks
    await delay(500); // simulate heavy processing
    req.write(item);
  }

  req.end();
}

/**
 * @param {import('node:http').RequestOptions} options
 */
async function list(options) {

  const req = http.request(options, (res) => {
    res.on('data', (chunk) => {
      console.log(chunk.toString());
    });

    res.on('end', () => {
      console.log('-- end --');
    });
  });

  req.on('error', (err) => {
    console.error(err);
  });

  req.end();
}

new Promise((resolve) => {
  const titles = 'name,timestamp\n';
  const names = [
    'John Doe',
    'Jane Smith',
    'Alice Johnson',
    'Bob Brown',
    'Charlie Davis',
    'Emily Wilson',
    'Frank Thomas',
    'Grace Lee',
    'Henry Martin',
    'Irene White',
    'Jack Harris',
    'Karen Clark',
    'Liam Lewis',
    'Mia Walker',
    'Noah Hall',
    'Olivia Young',
    'Paul King',
    'Quinn Wright',
    'Ruby Scott',
    'Sam Green',
  ];
  resolve([titles].concat(names.map((name, i) => `${name},${Date.now() + i}\n`)));
})
  .then((data) => store({
    hostname: 'localhost',
    port: 80,
    path: '/',
    method: 'POST',
    headers: {
      'Type': 'text/csv',
      'Transfer-Encoding': 'chunked',
      'Connection': 'keep-alive',
    }
  }, data))
  // RETRIEVE
  .then(() => list({
    hostname: 'localhost',
    port: 80,
    path: '/',
    method: 'GET',
    headers: { 'Accept': 'text/csv' },
  }));

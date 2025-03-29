async function listWithReader(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;

    const text = decoder.decode(value, { stream: true });
    console.log('Received chunk:', text);

    chunk = await reader.read();
  }

  console.log('--- end ---');
}

async function listWithIterator(url) {
  const response = await fetch(url);
  const body = response.body;

  const decoder = new TextDecoder('utf-8');

  // // alternative way
  // for await (const chunk of body) {
  //   const text = decoder.decode(chunk, { stream: true });
  //   console.log('Received chunk:', text);
  // }

  const iterator = body[Symbol.asyncIterator]();

  while (true) {
    const { done, value } = await iterator.next();

    if (done) break;

    const text = decoder.decode(value, { stream: true });
    console.log('Received chunk:', text);
  }

  console.log('--- end ---');
}

const url = new URL('http://localhost');
// listWithReader(url);
listWithIterator(url);

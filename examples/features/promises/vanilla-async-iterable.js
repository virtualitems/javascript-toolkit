const iterable = {
  [Symbol.asyncIterator]: async function* () {
    let i = 1;
    while (i <= 5) {
      yield i;
      i += 1;
    }
    return 6;
  }
};

const iter = iterable[Symbol.asyncIterator]();

function resolve({ value, done }) {
  if (value !== undefined) console.log(value);
  if (done === false) iter.next().then(resolve);
}

iter.next().then(resolve);

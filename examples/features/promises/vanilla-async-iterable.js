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

const iterator = iterable[Symbol.asyncIterator]();

function resolve({ value, done }) {
  if (value !== undefined) console.log(value);
  if (done === false) resolve.iterator.next().then(resolve);
}

resolve.iterator = iterator;

iterator.next().then(resolve);

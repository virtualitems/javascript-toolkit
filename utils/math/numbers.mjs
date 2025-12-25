const primes = {};

primes.next = function next(base) {
  let num = base + 1;

  while (true) {
    let isPrime = true;

    for (let i = 2, end = Math.sqrt(num); i <= end; i += 1) {
      if (num % i === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) return num;

    num += 1;
  }
}

export const numbers = { primes };

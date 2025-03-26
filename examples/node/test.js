// https://nodejs.org/docs/latest-v21.x/api/test.html

const {
  after,
  afterEach,
  before,
  beforeEach,
  describe,
  it,
  mock, // 
  only, // 
  run, // 
  skip,
  test,
  todo,
} = require('node:test');

const { equal } = require('node:assert');

// Module under test
const calc = {
  sum: (a, b) => a + b,
  sub: (a, b) => a - b,
  mul: (a, b) => a * b,
  div: (a, b) => {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  },
};

// Not implemented test
todo('should test something', () => { });

// Skipped test
skip('should test something', () => { });

// Test suite
describe('Calculator test suite', null, (ctx) => {

  const log = (message) => {
    ctx.signal.dispatchEvent(new CustomEvent('log', { detail: message }));
  };

  ctx.signal.addEventListener('log', (event) => console.log(event.detail));

  before((ctx) => {
    log('>> before');
  });

  beforeEach((ctx) => {
    log('>> beforeEach');
  });

  after((ctx) => {
    log('>> after');
  });

  afterEach((ctx) => {
    log('>> afterEach');
  });

  test('should sum two numbers', null, (ctx, done) => {
    log('>> test');

    // Arrange
    const number1 = 3;
    const number2 = 2;

    // Act
    const result = calc.sum(number1, number2);

    // Assert
    equal(result, 5);

    done();
  });

  it('should subtract two numbers', null, (ctx, done) => {
    log('>> test');

    // Arrange
    const number1 = 3;
    const number2 = 2;

    // Act
    const result = calc.sub(number1, number2);

    // Assert
    equal(result, 1);

    done();
  });

  it('should multiply two numbers', null, (ctx, done) => {
    log('>> test');

    // Arrange
    const number1 = 3;
    const number2 = 2;

    // Act
    const result = calc.mul(number1, number2);

    // Assert
    equal(result, 6);

    done();
  });

  it('should divide two numbers', null, (ctx, done) => {
    log('>> test');

    // Arrange
    const number1 = 3;
    const number2 = 2;

    // Act
    const result = calc.div(number1, number2);

    // Assert
    equal(result, 1.5);

    done();
  });

});

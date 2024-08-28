/**
 * @fileoverview Manually failing tests.
 */

/** @description Classic throw error. */
test('Qui-Gon Jinn', () => {

  throw new Error('There\'s always a bigger fish');

});

/** @description Using first argument of done callback. */
test('Obi-Wan Kenobi', done => {

  done('I have failed you, Anakin');

});

/** @description Changing the async function to a rejected promise. */
test('Anakin Skywalker', async () => {

  return Promise.reject('I hate you!');

});

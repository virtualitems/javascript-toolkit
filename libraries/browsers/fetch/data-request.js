/**
 * @fileoverview Step by step data request
 * @example
 *
 * [javascript]
 *
 * request(target, {init, decoder, transformer}).then(data => console.log(data));
 *
 */


/**
 * @param {RequestInfo | URL} target
 * @param {object} options
 * @param {RequestInit} options.init
 * @param {(response: Response) => Promise<unknown>} options.decoder
 * @param {(source: unknown) => Promise<unknown>} options.transformer
 */
async function request(target, options) {

  // request -> response
  const response = await fetch(target, options.init);

  if (response.ok === false) {
    throw new Error(`${response.status} ${response.statusText}`);
  }

  if ('function' !== typeof options.decoder) {
    return;
  }

  // response -> decoded source
  const source = await options.decoder(response);

  if ('function' !== typeof options.transformer) {
    return source;
  }

  // decoded source -> transformed data
  return await options.transformer(source);

} //:: function request

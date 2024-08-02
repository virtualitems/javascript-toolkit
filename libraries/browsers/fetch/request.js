/**
 * @fileoverview Step by step data request
 * @example
 *
 * [javascript]
 *
 * request(target, options).then(data => console.log(data));
 *
 */


/**
 * @param {RequestInfo | URL} target
 * @param {object} options
 * @param {RequestInit} options.init
 * @param {{[key: string]: () => unknown}} options.recovers
 * @param {(response: Response) => Promise<unknown>} options.decoder
 * @param {(source: unknown) => Promise<unknown>} options.transformer
 */
async function request(target, options) {
  try {

    // request -> response
    const response = await fetch(target, options.init);

    if (response.ok === false) {

      const recover = options.recovers[response.status];

      if ('function' !== typeof recover) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      recover();
      return;
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

  } catch (error) {
    throw new Error(error);

  }

} //:: function request

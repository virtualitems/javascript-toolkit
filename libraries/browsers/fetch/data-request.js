/**
 * @fileoverview Step by step data request
 * @example
 *
 * [javascript]
 *
 * const request = new DataRequest(target, {init, decoder, transformer});
 *
 * request.send().then(data => console.log(data));
 */


class DataRequest {

  /**
   * @param {RequestInfo | URL} target
   * @param {object} options
   * @param {RequestInit} options.init
   * @param {(response: Response) => Promise<unknown>} options.decoder
   * @param {(source: unknown) => Promise<unknown>} options.transformer
   */
  constructor(target, options) {
    this.target = target;
    this.init = options.init;
    this.decoder = options.decoder;
    this.transformer = options.transformer;
  }

  /**
   * @description request -> response
   * @returns {Promise<Response>}
   */
  async request() {
    try {
      return await fetch(this.target, this.options);
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * @description response -> decoded source
   * @param {Response} response
   * @returns {Promise<unknown>}
   */
  async decode(response) {
    try {
      return await this.decoder(response);
    } catch (error) {
      console.warn(error);
    }
  }

  /**
   * @description decoded source -> transformed data
   * @param {unknown} source
   * @returns {Promise<unknown>}
   */
  async transform(source) {
    try {
      return await this.transformer(source);
    } catch (error) {
      console.warn(error);
    }
  }

  async send() {
    try {
      const response = await this.request();

      if (response.ok === false) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      if ('function' !== typeof this.decoder) {
        return;
      }

      const source = await this.decode(response);

      if ('function' !== typeof this.transformer) {
        return source;
      }

      return await this.transform(source);

    } catch (error) {
      console.warn(error);
    }
  }

}

'use strict';

const uuidV4 = require('uuid/v4');
const LocalStore = require('./LocalStore');


function generatePIN(length = 4) {
  const n = Math.floor(Math.random() * (Math.pow(10, length) - 1));
  const nLength = n.toString().length;
  return '0'.repeat(length - nLength) + n;
}

class Identif {

  /**
   * Create an instance of Identif
   *
   * @param {object} [options]
   * @param {object} [options.store]
   * @param {function} [options.codeGenerator]
   * @param {function} [options.requestIdGenerator]
   */
  constructor(options = {}) {
    this.options = Object.assign({
      codeGenerator: generatePIN,
      requestIdGenerator: uuidV4
    }, options);

    this.store = this.options.store || new LocalStore();
    this.codeGenerator = this.options.codeGenerator;
    this.requestIdGenerator = this.options.requestIdGenerator;
  }

  /**
   * request the verification code
   *
   * @param {object} [extra]
   */
  request(extra = {}) {
    // Generate the code to validate and the reuqest id
    const code = this.codeGenerator();
    const requestId = this.requestIdGenerator();
    const createdAt = new Date();
    const data = { requestId, code, createdAt };

    // Cache the code with given data to the store
    return this.store.set(requestId, Object.assign(extra, data))
      // Respond with the request id
      .then(() => data);
  }

  /**
   * verify the code
   *
   * @param {string} requestId
   * @param {string} code
   */
  verify(requestId, code) {
    // Find the request id
    return this.store.get(requestId)
      .then((data) => {
        if (!data || data.code !== code)
          return null;

        // Respond with the data
        return data;
      });
  }
}

module.exports = Identif;

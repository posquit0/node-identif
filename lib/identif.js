'use strict';

const debug = require('debug')('identif');
const uuidV4 = require('uuid/v4');
const MemoryStore = require('./stores/memory');


const WARNING_MESSAGE = 'Warning: Identif MemoryStore is not designed '
  + 'for a production environment, as it will leak the memory.';
// TODO: request return ttl
// TODO: Store has deleteAfterGet

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

    this.store = this.options.store || new MemoryStore();
    this.codeGenerator = this.options.codeGenerator;
    this.requestIdGenerator = this.options.requestIdGenerator;

    if (process.env['NODE_ENV'] === 'production' && this.store instanceof MemoryStore) {
      // eslint-disable-next-line
      console.warn(WARNING_MESSAGE);
    }

    debug('create an instance');
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

    debug(`[request:${requestId}] code=${code}`);

    // Cache the code with given data to the store
    return this.store.set(requestId, Object.assign(extra, { code, createdAt }))
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
    debug(`[verify:${requestId}] code=${code}`);

    // Find the request id
    return this.store.get(requestId)
      .then((data) => {
        if (!data || data.code !== code) {
          return null;
        }

        // Respond with the data
        return data;
      });
  }
}

module.exports = Identif;

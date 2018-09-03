'use strict';

const debug = require('debug')('identif');
const uuidV4 = require('uuid/v4');
const MemoryStore = require('./stores/memory');


const WARNING_MESSAGE = 'Warning: Identif MemoryStore is not designed '
  + 'for a production environment, as it will leak the memory.';
// TODO: Store has deleteAfterGet

function generatePIN(length = 4) {
  const n = Math.floor(Math.random() * (Math.pow(10, length) - 1));
  const nLength = n.toString().length;
  return '0'.repeat(length - nLength) + n;
}

/**
 * Class representing a helper for identification process
 */
class Identif {
  /**
   * Create an instance of Identif.
   *
   * @param {object} [options] - The options of Identif.
   * @param {object} [options.store] - The store instance.
   * @param {function} [options.codeGenerator] - The function to generate code.
   * @param {function} [options.requestIdGenerator] - The function to generate request id.
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
   * Request the verification code.
   *
   * @param {object} extra - The extra data to store.
   * @param {object} [options={}] - The options of request operation.
   * @return {Object} The request information.
   */
  async request(extra, options = {}) {
    extra = extra || {};

    // Generate the request id and the code to validate
    const now = new Date();
    const ttl = options.ttl || this.store.options.ttl;
    const data = {
      id: this.requestIdGenerator(),
      code: this.codeGenerator,
      expireAt: new Date(now.getTime() + (1000 * ttl)),
      createdAt: now
    };
    // state, action, channel

    const { id, code } = data;
    debug(`[request] id=${id} code=${code} ttl=${ttl}`);

    // Cache the code with given data to the store
    await this.store.set(id, { ...extra, ...data }, ttl);
    return data;
  }

  /**
   * Verify the verification code.
   *
   * @param {string} id - The request id.
   * @param {string} code - The secret code which is sent via secure channel.
   * @return {Object} The request information.
   */
  async verify(id, code) {
    debug(`[verify] id=${id} code=${code}`);

    // Find the request by id
    const data = await this.store.get(id);

    if (!data || data.code !== code) {
      return null;
    }
    return data;
  }

  /**
   * Check the verification request.
   *
   * @param {string} id - The request id.
   * @return {Object} The request information.
   */
  async check(id) {
    debug(`[check] id=${id}`);

    // Find the request by id
    const data = await this.store.get(id);
    return data;
  }
}

module.exports = Identif;

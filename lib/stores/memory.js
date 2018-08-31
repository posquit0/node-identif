'use strict';

const debug = require('debug')('identif:memory-store');


/**
 * Class representing a store with Memory
 */
class MemoryStore {
  /**
   * Create an instance of MemoryStore
   *
   * @param {Object} [options={}] - The options of MemoryStore.
   * @param {number} [options.ttl=180] - The default remaining time to live in the store.
   * @param {string} [options.prefix] - The prefix of the key.
   */
  constructor(options = {}) {
    debug('create an instance');
    this.options = Object.assign({
      ttl: 3 * 60,
      prefix: ''
    }, options);

    debug('configure the store');
    this.store = new Map();
  }

  /**
   * Get the data object from the store.
   *
   * @param {string} key - The key used to set the data on the store.
   * @return {Object} The data from the store.
   */
  async get(key) {
    debug(`[get:${key}] get the data key=${this.options.prefix}${key}`);
    const data = this.store.get(`${this.options.prefix}${key}`) || null;
    return await data;
  }

  /**
   * Set the data object to the store.
   * TODO: Support ttl
   *
   * @param {string} key - The key used to set the data on the store.
   * @param {Object} data - The data to set.
   * @param {number} ttl - The remaining time to live in the store.
   */
  async set(key, data, ttl = this.options.ttl) {
    debug(`[set:${key}] serialize the data`);
    await this.store.set(`${this.options.prefix}${key}`, data);
    return null;
  }
}

module.exports = MemoryStore;

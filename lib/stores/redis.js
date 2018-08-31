'use strict';

const debug = require('debug')('identif:redis-store');
const Redis = require('ioredis');


/**
 * Class representing a store with Redis
 * TODO: Support injecting user's redis instance
 */
class RedisStore {
  /**
   * Create an instance of RedisStore
   *
   * @param {Object} [options={}] - The options of RedisStore.
   * @param {Object} [options.redis] - The redis client configurations.
   * @param {number} [options.ttl=180] - The default remaining time to live in the store.
   * @param {string} [options.prefix] - The prefix of the key.
   * @param {function} [options.serialize=JSON.stringify] - The function to serialize data to string.
   * @param {function} [options.deserialize=JSON.parse] - The function to deserialize data from string.
   */
  constructor(options = {}) {
    debug('create an instance');
    this.options = Object.assign({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
      ttl: 3 * 60,
      prefix: ''
    }, options);

    debug('configure the store');
    this.store = new Redis(this.options.redis);

    this.serialize = this.options.serialize || JSON.stringify;
    this.deserialize = this.options.deserialize || JSON.parse;
  }

  /**
   * Get the data object from the store.
   *
   * @param {string} key - The key used to set the data on the store.
   * @return {Object} The data from the store.
   */
  async get(key) {
    debug(`[get:${key}] get the data key=${this.options.prefix}${key}`);
    const serialized = await this.store.get(`${this.options.prefix}${key}`);

    debug(`[get:${key}] deserialize the data`);
    return serialized != null
      ? this.deserialize(serialized)
      : null;
  }

  /**
   * Set the data object to the store.
   *
   * @param {string} key - The key used to set the data on the store.
   * @param {Object} data - The data to set.
   * @param {number} ttl - The remaining time to live in the store.
   */
  async set(key, data, ttl = this.options.ttl) {
    debug(`[set:${key}] serialize the data`);
    const serialized = this.serialize(data);

    debug(`[set:${key}] set the data key=${this.options.prefix}${key}`);
    const ttlOption = ttl ? ['ex', ttl] : [];
    await this.store.set(`${this.options.prefix}${key}`, serialized, ...ttlOption);
    return this;
  }
}

module.exports = RedisStore;

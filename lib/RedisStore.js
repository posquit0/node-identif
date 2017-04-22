'use strict';

const Redis = require('ioredis');


class RedisStore {

  constructor(options = {}) {
    this.options = Object.assign({
      redis: {
        host: '127.0.0.1',
        port: 6379
      },
      ttl: 3 * 60,
    }, options);
    this.store = new Redis(this.options.redis);
    this.serialize = this.options.serialize || JSON.stringify;
    this.deserialize = this.options.deserialize || JSON.parse;
  }

  /**
   * get the data object from the store
   *
   * @param {string} key
   */
  get(key) {
    return this.store.get(key)
      .then(serialized => {
        return this.deserialize(serialized) || null;
      });
  }

  /**
   * set the data object to the store
   *
   * @param {string} key
   * @param {object} data
   */
  set(key, data) {
    const serialized = this.serialize(data);
    return this.store.set(key, serialized)
      .then(() => {
        if (this.options.ttl)
          this.store.expire(key, this.options.ttl);
      });
  }
}

module.exports = RedisStore;

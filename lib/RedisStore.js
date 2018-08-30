'use strict';

const debug = require('debug')('identif');
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

    debug('[store-redis] create an instance');
  }

  /**
   * get the data object from the store
   *
   * @param {string} key
   */
  get(key) {
    if (this.options.scope)
      key = `${this.options.scope}:${key}`;

    return this.store.get(key)
      .then(serialized => {
        const data = serialized ? this.deserialize(serialized) : null;
        debug(`[store-redis:get] key=${key}, data=%j`, data);
        return data;
      });
  }

  /**
   * set the data object to the store
   *
   * @param {string} key
   * @param {object} data
   */
  set(key, data) {
    if (this.options.scope)
      key = `${this.options.scope}:${key}`;

    debug(`[store-redis:set] key=${key}, data=%j`, data);

    const serialized = this.serialize(data);
    return this.store.set(key, serialized)
      .then(() => {
        if (this.options.ttl)
          this.store.expire(key, this.options.ttl);
        return null;
      });
  }
}

module.exports = RedisStore;

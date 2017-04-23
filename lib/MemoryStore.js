'use strict';

const debug = require('debug')('identif');


class MemoryStore {

  constructor() {
    this.store = new Map();

    debug('[store-memory] create an instance');
  }

  /**
   * get the data object from the store
   *
   * @param {string} key
   */
  get(key) {
    return new Promise((resolve, reject) => {
      try {
        const data = this.store.get(key) || null;
        debug(`[store-memory:get] key=${key}, data=%j`, data);
        resolve(data);
      } catch(err) {
        reject(err);
      }
    });
  }

  /**
   * set the data object to the store
   *
   * @param {string} key
   * @param {object} data
   */
  set(key, data) {
    debug(`[store-memory:set] key=${key}, data=%j`, data);

    return new Promise((resolve, reject) => {
      try {
        resolve(this.store.set(key, data));
      } catch(err) {
        reject(err);
      }
    });
  }
}

module.exports = MemoryStore;
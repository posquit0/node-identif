'use strict';


class LocalStore {

  constructor() {
    this.store = new Map();
  }

  /**
   * get the data object from the store
   *
   * @param {string} key
   */
  get(key) {
    return new Promise((resolve, reject) => {
      try {
        resolve(this.store.get(key) || null);
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
    return new Promise((resolve, reject) => {
      try {
        resolve(this.store.set(key, data));
      } catch(err) {
        reject(err);
      }
    });
  }
}

module.exports = LocalStore;
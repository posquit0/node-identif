'use strict';

const { expect } = require('chai');
const Redis = require('ioredis');
const { RedisStore } = require('../');


describe('RedisStore', function () {
  let redisStore;

  beforeEach(function () {
    redisStore = new RedisStore({ ttl: null });
  });

  describe('constructor()', function () {
    it('should create an instance of RedisStore which connects to redis server', function () {
      expect(redisStore).to.be.an.instanceof(RedisStore);
      expect(redisStore.store).to.be.an.instanceof(Redis);
    });
  });

  describe('get(key)', function () {
    it('should return a Promise', function () {
      expect(redisStore.get()).to.be.fulfilled;
    });

    it('should return null when undefined key is given', function* () {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = yield redisStore.get(randomKey);
        expect(data).to.be.null;
      }
    });

    it('should return expected value when existing key is given', function* () {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        yield redisStore.set(randomKey, i);
        expect(yield redisStore.get(randomKey)).to.equal(i);
      }
    });

    it('should expire the value after ttl', function* () {
      this.timeout(10000);
      this.slow(7000);

      redisStore.options.ttl = 1;
      for (let i = 0; i < 3; i++) {
        const randomKey = '' + Math.random();
        yield redisStore.set(randomKey, i);
        const till = new Date(new Date().getTime() + 1010);
        while (till > new Date()) {}
        expect(yield redisStore.get(randomKey)).to.equal(null);
      }
    });
  });

  describe('set(key, data)', function () {
    it('should return a Promise', function () {
      expect(redisStore.set()).to.be.fulfilled;
    });

    it('should return always null', function* () {
      expect(yield redisStore.set()).to.be.null;
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = yield redisStore.set(randomKey, Math.random());
        expect(data).to.be.null;
      }
    });
  });
});

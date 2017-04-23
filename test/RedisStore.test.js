'use strict';

const { expect } = require('chai');
const Redis = require('ioredis');
const { RedisStore } = require('../');


describe('RedisStore', function () {
  let redisStore;

  beforeEach(function () {
    redisStore = new RedisStore();
  });

  describe('constructor()', function () {
    it('should create an instance of RedisStore which connects to redis server', function () {
      expect(redisStore).to.be.an.instanceof(RedisStore);
      expect(redisStore.store).to.be.an.instanceof(Redis);
    });
  });

  describe('get(key)', function () {
    it('should return a Promise', function () {
      expect(redisStore.get()).to.be.instanceof(Promise);
    });

    it('should return null when undefined key is given', function* () {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = yield redisStore.get(randomKey);
        expect(data).to.be.null;
      }
    });

    it('should return expected value when existing key is given');
  });

  describe('set(key, data)', function () {
    it('should return a Promise', function () {
      expect(redisStore.set()).to.be.instanceof(Promise);
    });

    it('should return null when undefined key is given');

    it('should return expected value when existing key is given');
  });
});

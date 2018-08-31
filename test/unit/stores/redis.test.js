'use strict';

const Redis = require('ioredis');
const { RedisStore } = require('../../../');
const { sleep } = require('../../utils');


describe('RedisStore', () => {
  let redisStore;

  beforeEach(() => {
    redisStore = new RedisStore({ ttl: null });
  });

  afterEach(async () => {
    await redisStore.store.flushall();
    await redisStore.store.quit();
  });

  describe('constructor()', () => {
    it('should create an instance of RedisStore which connects to redis server', () => {
      expect(redisStore).toBeInstanceOf(RedisStore);
      expect(redisStore.store).toBeInstanceOf(Redis);
    });
  });

  describe('get(key)', () => {
    it('should return a Promise', () => {
      expect(redisStore.get()).toBeInstanceOf(Promise);
    });

    it('should return null when undefined key is given', async () => {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = await redisStore.get(randomKey);
        expect(data).toBeNull();
      }
    });

    it('should return expected value when existing key is given', async () => {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        await redisStore.set(randomKey, i);
        expect(await redisStore.get(randomKey)).toEqual(i);
      }
    });

    it('should expire the item after ttl', async () => {
      const ttl = 1;

      for (let i = 0; i < 3; i++) {
        const randomKey = '' + Math.random();
        await redisStore.set(randomKey, i, ttl);
        await sleep(ttl * 1010);
        expect(await redisStore.get(randomKey)).toEqual(null);
      }
    });
  });

  describe('set(key, data)', () => {
    it('should return a Promise', () => {
      expect(redisStore.set()).toBeInstanceOf(Promise);
    });

    it('should return always self instance', async () => {
      expect(await redisStore.set()).toEqual(redisStore);
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = await redisStore.set(randomKey, Math.random());
        expect(data).toEqual(redisStore);
      }
    });
  });
});

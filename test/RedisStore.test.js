'use strict';

const Redis = require('ioredis');
const { RedisStore } = require('../');


describe('RedisStore', () => {
  let redisStore;

  beforeEach(() => {
    redisStore = new RedisStore({ ttl: null });
  });

  afterEach(async () => {
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

    it('should expire the value after ttl', async () => {
      for (let i = 0; i < 3; i++) {
        const randomKey = '' + Math.random();
        await redisStore.set(randomKey, i, 1);
        const till = new Date(new Date().getTime() + 1010);
        while (till > new Date()) {}
        expect(await redisStore.get(randomKey)).toEqual(null);
      }
    });
  });

  describe('set(key, data)', () => {
    it('should return a Promise', () => {
      expect(redisStore.set()).toBeInstanceOf(Promise);
    });

    it('should return always null', async () => {
      expect(await redisStore.set()).toBeNull();
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = await redisStore.set(randomKey, Math.random());
        expect(data).toBeNull();
      }
    });
  });
});

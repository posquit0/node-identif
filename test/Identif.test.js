'use strict';

const { Identif, MemoryStore, RedisStore } = require('../');


describe('Identif(MemoryStore)', function () {
  let identif;

  beforeEach(() => {
    identif = new Identif();
  });

  describe('constructor()', () => {
    it('should create an instance of Identif with MemoryStore', () => {
      expect(identif).toBeInstanceOf(Identif);
      expect(identif.store).toBeInstanceOf(MemoryStore);
    });
  });

  describe('request(extra)', () => {
    it('should return a Promise', () => {
      expect(identif.request()).toBeInstanceOf(Promise);
    });
  });

  describe('verify(requestId, code)', () => {
    it('should return a Promise', () => {
      expect(identif.verify()).toBeInstanceOf(Promise);
    });
  });
});

describe('Identif(RedisStore)', () => {
  let identif;

  beforeEach(() => {
    identif = new Identif({ store: new RedisStore() });
  });

  afterEach(async () => {
    const store = identif.store;
    await store.store.quit();
  });

  describe('constructor()', () => {
    it('should create an instance of Identif with RedisStore', () => {
      expect(identif).toBeInstanceOf(Identif);
      expect(identif.store).toBeInstanceOf(RedisStore);
    });
  });

  describe('request(extra)', () => {
    it('should return a Promise', () => {
      expect(identif.request()).toBeInstanceOf(Promise);
    });
  });

  describe('verify(requestId, code)', () => {
    it('should return a Promise', () => {
      expect(identif.verify()).toBeInstanceOf(Promise);
    });
  });
});

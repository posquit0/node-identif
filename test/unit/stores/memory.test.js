'use strict';

const { MemoryStore } = require('../../../');


describe('MemoryStore', () => {
  let memoryStore;

  beforeEach(() => {
    memoryStore = new MemoryStore();
  });

  describe('constructor()', () => {
    it('should create an instance of MemoryStore which uses Map data type', () => {
      expect(memoryStore).toBeInstanceOf(MemoryStore);
      expect(memoryStore.store).toBeInstanceOf(Map);
      expect(memoryStore.store.size).toEqual(0);
    });
  });

  describe('get(key)', () => {
    it('should return a Promise', () => {
      expect(memoryStore.get()).toBeInstanceOf(Promise);
    });

    it('should return null when undefined key is given', async () => {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = await memoryStore.get(randomKey);
        expect(data).toBeNull();
      }
    });

    it.skip('should return expected value when existing key is given', () => {});
  });

  describe('set(key, data)', () => {
    it('should return a Promise', () => {
      expect(memoryStore.set()).toBeInstanceOf(Promise);
    });

    it.skip('should return null when undefined key is given', () => {});

    it.skip('should return expected value when existing key is given', () => {});
  });
});

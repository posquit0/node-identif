'use strict';

const { expect } = require('chai');
const { MemoryStore } = require('../');


describe('MemoryStore', function () {
  let memoryStore;

  beforeEach(function () {
    memoryStore = new MemoryStore();
  });

  describe('constructor()', function () {
    it('should create an instance of MemoryStore which uses Map data type', function () {
      expect(memoryStore).to.be.an.instanceof(MemoryStore);
      expect(memoryStore.store).to.be.an.instanceof(Map);
      expect(memoryStore.store.size).to.equal(0);
    });
  });

  describe('get(key)', function () {
    it('should return a Promise', function () {
      expect(memoryStore.get()).to.be.instanceof(Promise);
    });

    it('should return null when undefined key is given', function* () {
      for (let i = 0; i < 10; i++) {
        const randomKey = '' + Math.random();
        const data = yield memoryStore.get(randomKey);
        expect(data).to.be.null;
      }
    });

    it('should return expected value when existing key is given');
  });

  describe('set(key, data)', function () {
    it('should return a Promise', function () {
      expect(memoryStore.set()).to.be.instanceof(Promise);
    });

    it('should return null when undefined key is given');

    it('should return expected value when existing key is given');
  });
});

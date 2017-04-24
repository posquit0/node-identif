'use strict';

const { expect } = require('chai');
const { Identif, MemoryStore, RedisStore } = require('../');


describe('Identif(MemoryStore)', function () {
  let identif;

  beforeEach(function () {
    identif = new Identif();
  });

  describe('constructor()', function () {
    it('should create an instance of Identif with MemoryStore', function () {
      expect(identif).to.be.an.instanceof(Identif);
      expect(identif.store).to.be.an.instanceof(MemoryStore);
    });
  });

  describe('request(extra)', function () {
    it('should return a Promise', function () {
      expect(identif.request()).to.be.instanceof(Promise);
    });
  });

  describe('verify(requestId, code)', function () {
    it('should return a Promise', function () {
      expect(identif.verify()).to.be.instanceof(Promise);
    });
  });
});

describe('Identif(RedisStore)', function () {
  let identif;

  beforeEach(function () {
    identif = new Identif({ store: new RedisStore() });
  });

  describe('constructor()', function () {
    it('should create an instance of Identif with RedisStore', function () {
      expect(identif).to.be.an.instanceof(Identif);
      expect(identif.store).to.be.an.instanceof(RedisStore);
    });
  });

  describe('request(extra)', function () {
    it('should return a Promise', function () {
      expect(identif.request()).to.be.fulfilled;
    });
  });

  describe('verify(requestId, code)', function () {
    it('should return a Promise', function () {
      expect(identif.verify()).to.be.fulfilled;
    });
  });
});

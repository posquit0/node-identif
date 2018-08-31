'use strict';

const Identif = require('./lib/identif');
const RedisStore = require('./lib/stores/redis');
const MemoryStore = require('./lib/stores/memory');


module.exports = { Identif, RedisStore, MemoryStore };

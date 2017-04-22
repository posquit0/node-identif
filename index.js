'use strict';

const Identif = require('./lib/Identif');
const RedisStore = require('./lib/RedisStore');
const LocalStore = require('./lib/LocalStore');


module.exports = {
  Identif,
  RedisStore,
  LocalStore
};

<div align="center">
  <a href="https://github.com/posquit0/node-identif" title="Identif.js">
    <img alt="Identif.js" src="http://www.discoveringidentity.com/resources/WindowsLiveWriter_IdentityTrend9IdentityAnalytics_A52A_image3.png" width="240px" />
  </a>
  <br />
  <h1>Identif</h1>
</div>

<p align="center">
  A Helper to verify one's identity via personal channels
</p>

<div align="center">
  <a href="https://circleci.com/gh/posquit0/node-identif">
    <img alt="CircleCI" src="https://circleci.com/gh/posquit0/node-identif.svg?style=shield" />
  </a>
  <a href="https://coveralls.io/github/posquit0/node-identif">
    <img src="https://coveralls.io/repos/github/posquit0/node-identif/badge.svg" alt='Coverage Status' />
  </a>
  <a href="https://badge.fury.io/js/identif">
    <img alt="npm version" src="https://badge.fury.io/js/identif.svg" />
  </a>
  <a href="https://www.npmjs.com/package/identif">
    <img alt="npm" src="https://img.shields.io/npm/dt/identif.svg" />
  </a>
  <a href="https://david-dm.org/posquit0/node-identif">
    <img alt="npm" src="https://img.shields.io/david/posquit0/node-identif.svg?style=flat-square" />
  </a>
  <a href="https://opensource.org/licenses/mit-license.php">
    <img alt="MIT Licence" src="https://badges.frapsoft.com/os/mit/mit.svg?v=103" />
  </a>
  <a href="https://github.com/ellerbrock/open-source-badge/">
    <img alt="Open Source Love" src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" />
  </a>
</div>

<br />

**Identif** is an abstract helper class to easily implement the identity verification logic via personal channels like SMS, Phone, E-Mail, and more.

- It was written for use on [**CARPLAT**](https://carplat.co.kr) which is the platform service for the car rental.


## Installation

```bash
# NPM
$ npm install --save identif
# Yarn
$ yarn add identif
```

### Dependencies

- [**Redis**](https://redis.io): if you use `RedisStore`, the connection to redis server is required.


## Usage

```node
const { Identif, RedisStore } = require('identif');

// Create an instance of Identif with RedisStore
const identif = new Identif({
  store: new RedisStore({
    redis: { host: 'my.redis.com', port: 6379 },
    ttl: 3 * 60
  })
});

// Request the verification
const { requestId, code, createdAt } = await identif.request();
/*
Output
{
  requestId: 'e89c3600-6ac7-469e-8d7e-e6e7847b346d',
  code: '1274',
  createdAt: '2017-04-23T14:47:24.173Z'
}
*/

// Respond to the client including `requestId`, `createdAt`
// Send `code` via a personal secure channel like SMS, E-Mail

// Verify the request
const data = await identif.verify(requestId, code);
if (!data) {
  // Failed to verify one's identity
} else {
  // Verifed one's identity
}
```


## API

### Identif([options])

#### Methods

* `request([extra])`
* `verify(requestId, code)`

### MemoryStore()

#### Methods

* `get(key)`
* `set(key, data)`

### RedisStore([options])

#### Methods

* `get(key)`
* `set(key, data)`


## Contact

If you have any questions, feel free to join me at [`#posquit0` on Freenode](irc://irc.freenode.net/posquit0) and ask away. Click [here](https://kiwiirc.com/client/irc.freenode.net/posquit0) to connect.


## License

[MIT](https://github.com/posquit0/node-identif/blob/master/LICENSE) © [Byungjin Park](http://www.posquit0.com)

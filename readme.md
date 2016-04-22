# subtle-digest
a simple (callback-based) wrapper around `crypto.subtle.digest`

## Usage

### Testing for algorithm support

Before you start wildly trying to hash things, you might want to determine browser support. `subtle-digest` provides a handy method for checking both if the browser supports `crypto.subtle.digest`, and also if it supports your desired algorithm.

```js
var supports = require('subtle-digest/supports')

supports('sha1', function (yep) {
  typeof yep
  => boolean
})
```

### Hashing things

Because `crypto.subtle.digest` accepts and returns `ArrayBuffer` objects, the most basic usage of `subtle-digest` is as follows:

```js
var digest = require('subtle-digest')

digest('sha1', new ArrayBuffer, function (err, buf) {
  buf instanceof ArrayBuffer
  => true
})
```

However, if your application is doing a lot of hashing with a particular algorithm you might find this approach more pleasant:

```js
var digest = require('subtle-digest')
var sha1 = digest('sha1')

sha1(new ArrayBuffer, function (err, buf) {
  buf instanceof ArrayBuffer
  => true
})
```

#### Errors

If you attempt to use an unsupported algorithm, you _might_ be forwarded an error from the browser like so:

```js
var digest = require('subtle-digest')

digest('sham-1', new ArrayBuffer, function (err, buf) {
  err.message
  => Algorithm: Unrecognized name
})
```

But the browser might also just throw an error and never trigger your callback so you should probably use `subtle-digest/supports` before attempting to hash.

#### Dealing in strings

Based on my own usage, I suspect a lot of people want hexadecimal string representations of their hashes. I consider that outside of the scope of this module, but it’s pretty easy to acheive:

```js
var digest = require('subtle-digest')
var hex = require('u8a/to-hex')

digest('sha1', new ArrayBuffer, function (err, buf) {
  hex(new Uint8Array(buf))
  => da39a3ee5e6b4b0d3255bfef95601890afd80709
})
```

And if you want to generate a hash _of_ a string, it’s similiarly uncomplicated:

```js
var digest = require('subtle-digest')
var hex = require('u8a/to-hex')
var u8a = require('u8a/from-string')

digest('sha1', u8a('some string'), function (err, buf) {
  hex(new Uint8Array(buf))
  => 8b45e4bd1c6acb88bebf6407d16205f567e62a3e
})
```

## Page weight

`require('subtle-digest')`

| compression             |    size |
| :---------------------- | ------: |
| subtle-digest.js        | 1.17 kB |
| subtle-digest.min.js    |   882 B |
| subtle-digest.min.js.gz |   475 B |

`require('subtle-digest/supports')`

| compression                      |    size |
| :------------------------------- | ------: |
| subtle-digest/supports.js        | 1.41 kB |
| subtle-digest/supports.min.js    |   998 B |
| subtle-digest/supports.min.js.gz |   549 B |

## Running the tests

Until [testling](https://ci.testling.com/) comes back (or is replaced by something elegant) you can run the tests in any browser yourself:

```sh
$ git clone git@github.com:michaelrhodes/subtle-digest
$ cd subtle-digest
$ npm install
$ npm test
```

## License

[MIT](http://opensource.org/licenses/MIT)

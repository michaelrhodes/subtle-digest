var scope = require('./scope')
var subtle = require('./subtle')
var normal = require('./normal')
var buf = 'ArrayBuffer' in scope ? new ArrayBuffer : null

module.exports = function (algo, cb) {
  if (!buf) return nope(new Error('ArrayBuffer is not supported'))

  // Browsers throw if they lack support for an algorithm.
  // Promise will be rejected on non-secure origins. (http://goo.gl/lq4gCo)
  try { subtle.digest({ name: normal(algo) }, buf).then(yep, nope) }
  catch (err) { setTimeout(nope, 0, err) }

  function yep () { cb(true) }
  function nope (err) { cb(false, err) }
}

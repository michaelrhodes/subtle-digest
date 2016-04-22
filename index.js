var subtle = require('./subtle')
var normal = require('./normal')

module.exports = function (algo, buf, cb) {
  algo = normal(algo)

  return arguments.length === 3 ?
    digest(buf, cb) :
    digest

  function digest (buf, cb) {
    subtle.digest({ name: algo }, buf)
      .then(function (buf) {
        cb(null, buf)
      }, cb)
  }
}

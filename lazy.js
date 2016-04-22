var digest = require('./index')
var supports = require('./supports')
var slice = Array.prototype.slice

module.exports = function () {
  var queue = []
  var checked = false
  var supported = false
  var error = null
  var args = slice.call(arguments)
  var algo = args.shift()

  gatekeeper.apply(null, args)

  supports(algo, function (hasSupport, err) {
    checked = true
    supported = hasSupport
    error = err

    var queued
    while (queued = queue.shift()) {
      gatekeeper.apply(null, queued)
    }
  })

  function gatekeeper () {
    var args = slice.call(arguments)
    if (args.length >= 3) args = args.slice(1, 3)
    if (!checked) return queue.push(args)

    return supported ?
      digest.apply(null, [algo].concat(args)) :
      setTimeout(args.pop(), 0, error)
  }

  if (!args.length) {
    return gatekeeper
  }
}

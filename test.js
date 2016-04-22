var test = require('tape')
var hex = require('u8a/to-hex')
var supports = require('./supports')
var subtle = require('./index')

var tick = '✔︎'

test('it can test for support', function (assert) {
  supports('SHA-1', function (yes) {
    assert.equal(typeof yes, 'boolean', tick)
    yes ? further(assert) : assert.end()
  })
})

function further (assert) {
  var input = new ArrayBuffer

  usage(fuzzy(end))

  function usage (next) {
    subtle('SHA-1', input, function (err, buf) {
      assert.comment('it is flexible with usage')
      assert.comment('(algo, buf, cb)')
      check(err, buf)

      var sha1 = subtle('SHA-1')
      sha1(input, function (err, buf) {
        assert.comment('(algo)(buf, cb)')
        check(err, buf)
        next(assert)
      })
    })
  }

  function fuzzy (next) {
    return function (assert) {
      subtle('sha-1', input, function (err, buf) {
        assert.comment('it is flexible with algorithm names')
        assert.comment('as specified')
        check(err, buf)

        subtle('sha1', input, function (err, buf) {
          assert.comment('without dash')
          check(err, buf)
          next(assert)
        })
      })
    }
  }

  function end (assert) {
    assert.end()
  }

  function check (err, buf) {
    var hash = hex(new Uint8Array(buf))
    var expected = 'da39a3ee5e6b4b0d3255bfef95601890afd80709'
    assert.equal(err, null, tick)
    assert.equal(hash, expected, tick)
  }
}

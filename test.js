var test = require('tape')
var hex = require('u8a/to-hex')
var supports = require('./supports')
var subtle = require('./index')
var lazy = require('./lazy')

var tick = '✔︎'

test('it can test for support', function (assert) {
  supports('SHA-1', function (yes) {
    assert.equal(typeof yes, 'boolean', tick)
    yes ? further(assert) : assert.end()
  })
})

function further (assert) {
  var input = new ArrayBuffer

  usage(fuzzy(error(lazyyyyy(end))))

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

  function error (next) {
    return function (assert) {
      supports('fake-1', function (yep, err) {
        assert.equal(yep, false, tick)
        assert.equal(err instanceof Error, true)
        next(assert)
      })
    }
  }

  function lazyyyyy (next) {
    return function (assert) {
      lazy('sha-1', input, function (err, buf) {
        assert.comment('it has a lazy mode')
        assert.comment('which works like normal')
        check(err, buf)

        lazy('fake-1', input, function (err, buf) {
          assert.comment('but it catches unsupported errors')
          assert.comment('(algo, buf, cb)')
          echeck(err, buf)

          var fake256 = lazy('fake256')
          fake256(input, function (err, buf) {
            assert.comment('(algo)(buf, cb)')
            echeck(err, buf)
            next(assert)
          })
        })
      })

      function echeck (err, buf) {
        assert.equal(err instanceof Error, true, tick)
        assert.equal(typeof buf, 'undefined', tick)
      }
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

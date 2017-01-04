var scope = require('./scope')
var crypto = scope.crypto || scope.msCrypto || {}
module.exports = crypto.subtle || crypto.webkitSubtle

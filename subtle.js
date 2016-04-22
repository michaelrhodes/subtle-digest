var crypto = window.crypto || window.msCrypto || {}
module.exports = crypto.subtle || crypto.webkitSubtle

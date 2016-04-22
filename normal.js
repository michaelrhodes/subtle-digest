module.exports = function (algo) {
  return algo
    .replace(/^([a-z]+)([0-9]+)$/i, '$1-$2')
    .toUpperCase()
}

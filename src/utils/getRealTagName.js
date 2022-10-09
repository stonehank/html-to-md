const config = require('../config.js')

function getRealTagName (tagName) {
  if (!tagName) return tagName
  const { aliasTags } = config.get()
  if (aliasTags[tagName] != null) {
    return aliasTags[tagName]
  }
  return tagName
}

module.exports = getRealTagName

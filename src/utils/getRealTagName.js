import config from '../config'

function getRealTagName(tagName) {
  if (!tagName) return tagName
  const { aliasTags } = config.get()
  if (aliasTags[tagName] != null) {
    return aliasTags[tagName]
  }
  return tagName
}

export default getRealTagName

import config from '../config'
import isSelfClosing from './isSelfClosing'
import isValidHTMLTags from './isValidHTMLTags'

function getTagConstructor(tagName) {
  let clazz
  const { skipTags, emptyTags, ignoreTags, aliasTags, renderCustomTags } =
    config.get()
  const selfClose = isSelfClosing(tagName)
  if (skipTags.includes(tagName)) {
    const skip = require('../tags/__skip__')
    return selfClose ? skip.__SkipSelfClose__ : skip.__Skip__
  }
  if (emptyTags.includes(tagName)) {
    const empty = require('../tags/__empty__')
    return selfClose ? empty.__EmptySelfClose__ : empty.__Empty__
  }
  if (ignoreTags.includes(tagName)) {
    return require('../tags/__ignore__').default
  }
  if (aliasTags[tagName] != null) {
    const newTagName = aliasTags[tagName]
    return getTagConstructor(newTagName)
  }

  const lowerTag = tagName.toLowerCase()
  if (renderCustomTags !== true && !isValidHTMLTags(lowerTag)) {
    if (renderCustomTags === false || renderCustomTags === 'SKIP') {
      const skip = require('../tags/__skip__')
      return selfClose ? skip.__SkipSelfClose__ : skip.__Skip__
    }
    if (renderCustomTags === 'EMPTY') {
      const empty = require('../tags/__empty__')
      return selfClose ? empty.__EmptySelfClose__ : empty.__Empty__
    }
    if (renderCustomTags === 'IGNORE') {
      return require('../tags/__ignore__').default
    }
  }

  try {
    clazz = require(`../tags/${tagName}`).default
  } catch (e) {
    if (selfClose) {
      clazz = require('../tags/__nomatch__').__NoMatchSelfClose__
    } else {
      clazz = require('../tags/__nomatch__').__NoMatch__
    }
  }

  return clazz
}

export default getTagConstructor

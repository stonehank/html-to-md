const { escape, extraEscape, unescape } = require('./escape')
const generateGetNextValidTag = require('./generateGetNextValidTag')
const getTagConstructor = require('./getTagConstructor')
const isSelfClosing = require('./isSelfClosing')
const getTagAttributes = require('./getTagAttributes')
const getLanguage = require('./getLanguage')
const clearComment = require('./clearComment')
const getRealTagName = require('./getRealTagName')
const isIndependentTag = require('./isIndependentTag')
const getTableAlign = require('./getTableAlign')
const shouldRenderRawInside = require('./shouldRenderRawInside')

module.exports = {
  escape,
  extraEscape,
  unescape,
  getRealTagName,
  getTagConstructor,
  generateGetNextValidTag,
  isSelfClosing,
  getTagAttributes,
  getTableAlign,
  getLanguage,
  clearComment,
  isIndependentTag,
  shouldRenderRawInside,
}

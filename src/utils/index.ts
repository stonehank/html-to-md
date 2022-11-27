import { extraEscape, unescapeStr } from './escape'
import generateGetNextValidTag from './generateGetNextValidTag'
import getTagConstructor from './getTagConstructor'
import isSelfClosing from './isSelfClosing'
import getTagAttributes from './getTagAttributes'
import getLanguage from './getLanguage'
import clearComment from './clearComment'
import getRealTagName from './getRealTagName'
import isIndependentTag from './isIndependentTag'
import getTableAlign from './getTableAlign'
import shouldRenderRawInside from './shouldRenderRawInside'

export {
  // escape,
  extraEscape,
  unescapeStr,
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

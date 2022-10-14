import Tag from '../Tag'
import SelfCloseTag from '../SelfCloseTag'
import { isIndependentTag, getRealTagName } from '../utils'
/*
 *
 * <div><b>abc</b></div>
 * ==> **abc**
 *
 * */

class __Skip__ extends Tag {
  constructor(str, tagName = '__skip__', options) {
    super(str, tagName, options)
    this.noNeedWrap = ['td', 'th']
    this.tagName = tagName
  }

  exec() {
    const need =
      isIndependentTag(getRealTagName(this.tagName)) &&
      !this.noNeedWrap.includes(this.parentTag)
    const pre = need ? '\n' : ''
    const aft = need ? '\n' : ''
    return super.exec(pre, aft)
  }
}

class __SkipSelfClose__ extends SelfCloseTag {
  constructor(str, tagName = '__skipselfclose__', options) {
    super(str, tagName, options)
    this.str = str
  }

  exec() {
    return this.str
  }
}

export { __Skip__, __SkipSelfClose__ }

import Tag from '../Tag'
import SelfCloseTag from '../SelfCloseTag'
import { isIndependentTag, getRealTagName } from '../utils'
import { TagOptions, SelfCloseTagOptions } from '../type'
/*
 *
 * <div><b>abc</b></div>
 * ==> **abc**
 *
 * */

class __Skip__ extends Tag {
  noNeedWrap: string[]
  constructor(str: string, tagName = '__skip__', options: TagOptions) {
    super(str, tagName, options)
    this.noNeedWrap = ['td', 'th']
  }

  exec() {
    const need =
      isIndependentTag(getRealTagName(this.tagName)) &&
      (!this.parentTag || !this.noNeedWrap.includes(this.parentTag))
    const pre = need ? '\n' : ''
    const aft = need ? '\n' : ''
    return super.exec(pre, aft)
  }
}

class __SkipSelfClose__ extends SelfCloseTag {
  str: any
  constructor(
    str: string,
    tagName = '__skipselfclose__',
    options: SelfCloseTagOptions
  ) {
    super(str, tagName, options)
    this.str = str
  }

  exec() {
    return this.str
  }
}

export { __Skip__, __SkipSelfClose__ }

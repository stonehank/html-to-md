import { ParseOptions } from '../type'
import { extraEscape } from '../utils'
import isIndependentTag from '../utils/isIndependentTag'

class __RawString__ {
  tagName: string | null
  nextTagName: string | null
  prevTagName: string | null
  parentTag: string | null
  keepFormat: boolean
  calcLeading: boolean
  leadingSpace: string
  layer: number
  rawStr: string
  constructor(
    str: string,
    tagName: string | null = '__nomatch__',
    {
      keepFormat = false,
      prevTagName = '',
      nextTagName = '',
      parentTag = '',
      calcLeading = false,
      layer = 1,
      leadingSpace = '',
    }: ParseOptions = {}
  ) {
    this.tagName = tagName
    this.nextTagName = nextTagName
    this.prevTagName = prevTagName
    this.parentTag = parentTag
    this.keepFormat = keepFormat
    this.calcLeading = calcLeading
    this.leadingSpace = leadingSpace
    this.layer = layer
    this.rawStr = str
  }

  slim(str: string) {
    if (this.keepFormat) return str

    let _str = str.replace(/\s+/g, ' ')
    // TODO ?
    // if(isIndependentTag(this.prevTagName) || isIndependentTag(this.nextTagName)){
    //   _str=str.trim()
    // }
    if (this.prevTagName && isIndependentTag(this.prevTagName)) {
      _str = _str.trimLeft()
    }
    if (this.nextTagName && isIndependentTag(this.nextTagName)) {
      _str = _str.trimRight()
    }
    return _str
  }

  beforeReturn(content: string) {
    if (this.keepFormat) return content
    if (this.calcLeading) {
      return this.leadingSpace + extraEscape(content)
    }
    return extraEscape(content)
  }

  exec() {
    let content = this.rawStr
    content = this.slim(content)
    content = this.beforeReturn(content)
    return content
  }
}

export default __RawString__

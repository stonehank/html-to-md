import { ParseOptions, TagName } from '../type'
import { extraEscape } from '../utils'
import isIndependentTag from '../utils/isIndependentTag'

class __RawString__ {
  tagName: TagName
  nextTagName: TagName
  prevTagName: TagName
  parentTag: TagName
  keepFormat: boolean
  calcLeading: boolean
  leadingSpace: string
  layer: number
  rawStr: string
  constructor(
    str: string,
    tagName: TagName = '__nomatch__',
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

    if (isIndependentTag(this.prevTagName)) {
      _str = _str.trimLeft()
    }
    if (isIndependentTag(this.nextTagName)) {
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

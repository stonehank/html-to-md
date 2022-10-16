import { SelfCloseTagOptions, TagName } from './type'
import { getTagAttributes } from './utils'

class SelfCloseTag {
  tagName: TagName
  parentTag: TagName
  prevTagName: TagName
  nextTagName: TagName
  rawStr: string
  isFirstTag: boolean
  leadingSpace: string
  layer: number
  attrs: Record<string, string>
  constructor(
    str: string,
    tagName: TagName,
    {
      parentTag = '',
      leadingSpace = '',
      layer = 1,
      isFirstTag = false,
      prevTagName = '',
      nextTagName = '',
    }: SelfCloseTagOptions = {}
  ) {
    this.tagName = tagName
    this.rawStr = str
    this.parentTag = parentTag
    this.isFirstTag = isFirstTag
    this.prevTagName = prevTagName
    this.nextTagName = nextTagName
    this.leadingSpace = leadingSpace
    this.layer = layer
    if (!this.__detectStr__(str, this.tagName)) {
      this.attrs = {}
      return
    }
    const { attr } = this.__fetchTagAttr__(str)
    this.attrs = attr
  }

  /**
   * Detect is a valid tag string
   * @param str
   * @param tagName
   * @returns {boolean}
   */
  __detectStr__(str: string, tagName: TagName) {
    if (str[0] !== '<') {
      console.error(
        `Not a valid tag, current tag name: ${this.tagName}, tag content: ${str}`
      )
      return false
    }
    let name = ''
    let name_done = false
    for (let i = 1; i < str.length; i++) {
      if (str[i] === '>') break
      if (!name_done && /(\s|\/)/.test(str[i])) {
        name_done = true
      }
      if (!name_done) {
        name += str[i]
      }
    }
    if (name !== tagName) {
      console.warn(
        'Tag is not match tagName, tagName in str is ' +
          name +
          ', which tagName passed from parent is ' +
          tagName
      )
      return false
    }
    return true
  }

  /**
   *
   * @param str
   * @returns {{attr: {}}}
   */
  __fetchTagAttr__(str: string) {
    let openTagAttrs = ''
    let i = 1
    for (; i < str.length; i++) {
      if (str[i] === '>') break
      openTagAttrs += str[i]
    }
    return {
      attr: getTagAttributes(openTagAttrs),
    }
  }

  // 在步骤开始前，一般只需返回空字符串
  beforeParse() {
    return ''
  }

  // 在合并必要的空行前
  beforeMergeSpace(content: string) {
    return content
  }

  // 合并必要的空行后
  afterMergeSpace(str: string) {
    return str
  }

  // 最终返回前
  beforeReturn(content: string) {
    return content
  }

  exec(prevGap = '', endGap = '') {
    let content = this.beforeParse()
    content = this.beforeMergeSpace(content)
    content = prevGap + content + endGap
    content = this.afterMergeSpace(content)
    content = this.beforeReturn(content)
    return content
  }
}

export default SelfCloseTag

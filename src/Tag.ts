import {
  getTagConstructor,
  getTagAttributes,
  generateGetNextValidTag,
  isSelfClosing,
} from './utils'
import RawString from './tags/__rawString__'
import { SINGLE } from './utils/CONSTANT'
import isIndependentTag from './utils/isIndependentTag'
import { ParseOptions, TagName, TagOptions } from './type'
class Tag {
  tagName: TagName
  parentTag: TagName
  prevTagName: TagName
  nextTagName: TagName
  rawStr: string
  prevTagStr: string
  nextTagStr: string
  isFirstTag: boolean
  calcLeading: boolean
  leadingSpace: string
  layer: number
  noWrap: boolean
  match: string | null
  indentSpace: string
  language: string
  count: number
  tableColumnCount: number
  noExtraLine: boolean
  keepFormat: boolean
  attrs: Record<string, string>
  content: string
  constructor(
    str: string,
    tagName: TagName,
    {
      keepFormat = false,
      prevTagName = '',
      nextTagName = '',
      prevTagStr = '',
      nextTagStr = '',
      parentTag = '',
      isFirstTag = true,
      calcLeading = false,
      leadingSpace = '',
      layer = 1,
      noWrap = false,
      match = null,
      indentSpace = '',
      language = '',
      count = 1,
      tableColumnCount = 0,
      noExtraLine = false,
    }: TagOptions = {}
  ) {
    this.tagName = tagName
    this.rawStr = str
    this.parentTag = parentTag
    this.prevTagName = prevTagName
    this.nextTagName = nextTagName
    this.prevTagStr = prevTagStr
    this.nextTagStr = nextTagStr
    this.isFirstTag = isFirstTag
    this.calcLeading = calcLeading
    this.leadingSpace = leadingSpace
    this.layer = layer
    this.noWrap = noWrap
    this.match = match
    this.indentSpace = indentSpace
    this.language = language
    this.count = count
    this.tableColumnCount = tableColumnCount
    // 在blockquote内部，如果前面img 后面p 不会再有额外的一行，因为在内部已经处理了
    this.noExtraLine = noExtraLine

    this.keepFormat = keepFormat
    if (!this.__detectStr__(str, this.tagName)) {
      this.attrs = {}
      this.content = ''
      return
    }
    const { attr, content } = this.__fetchTagAttrAndContent__(str)
    this.attrs = attr
    this.content = content
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

    // // SelfClose tag
    // if (name.endsWith('/')) {
    //   console.warn(
    //     'There detect a self close tag, which name is:',
    //     name.slice(0, -1)
    //   )
    //   return false
    // }
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
   * @returns {{attr: {}, content: *}}
   */
  __fetchTagAttrAndContent__(str: string) {
    let openTagAttrs = ''
    let i = 1
    for (; i < str.length; i++) {
      if (str[i] === '>') break
      openTagAttrs += str[i]
    }
    const restStr = str.slice(i + 1)
    let m = ''
    let endId = -1
    for (let j = restStr.length - 1; j >= 0; j--) {
      m = restStr[j] + m
      if (m.startsWith('</')) {
        if (m.startsWith('</' + this.tagName + '>')) {
          endId = j
        }
        break
      }
    }
    if (endId === -1 && isSelfClosing(this.tagName)) {
      console.warn(
        'There detect a self close tag, which name is:',
        this.tagName
      )
    }
    return {
      attr: getTagAttributes(openTagAttrs),
      content: restStr.slice(0, endId),
    }
  }

  __onlyLeadingSpace__(str: string) {
    str = str.trim()
    for (let i = 0; i < str.length; i++) {
      if (str[i] !== SINGLE) return false
    }
    return true
  }

  __isEmpty__(str: string) {
    if (this.keepFormat) return false
    return (
      (str === '' && this.tagName !== 'td') ||
      (this.calcLeading && this.__onlyLeadingSpace__(str))
    )
  }

  // 在步骤开始前，一般只需返回空字符串
  beforeParse() {
    return ''
  }

  // 存在tagName时，解析步骤
  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ) {
    const SubTagClass = getTagConstructor(subTagName)
    const subTag = new SubTagClass(subTagStr, subTagName, options)
    return subTag.exec()
  }

  // 不存在tagName时，解析步骤
  parseOnlyString(
    subTagStr: string,
    subTagName: TagName,
    options: ParseOptions
  ) {
    const rawString = new RawString(subTagStr, subTagName, options)
    return rawString.exec()
  }

  // 在解析完毕后，此时还并未去除不必要的空行
  afterParsed(content: string) {
    return content
  }

  // 去除不必要的空行
  slim(content: string) {
    // 在代码块内部
    if (this.keepFormat) {
      return content
    }
    return content.trim()
  }

  // 去除不必要的空行后，但在合并必要的空行前
  beforeMergeSpace(content: string) {
    return content
  }

  mergeSpace(content: string, prevGap: string, endGap: string) {
    if (this.keepFormat && this.tagName !== 'pre') {
      // 在代码块内部减少换行
      return content.endsWith('\n')
        ? content
        : content + endGap.replace(/\n+/g, '\n')
    } else {
      return prevGap + content + endGap
    }
  }

  // 合并必要的空行后
  afterMergeSpace(content: string) {
    return content
  }

  // 最终返回前
  beforeReturn(content: string) {
    return content
  }

  exec(prevGap = '', endGap = '') {
    let content = this.beforeParse()
    const getNxtValidTag = generateGetNextValidTag(this.content)
    let [nextTagName, nextTagStr] = getNxtValidTag()
    let prevTagName = null
    while (nextTagStr !== '') {
      const [afterNextTagName, afterNextTagStr] = getNxtValidTag()
      const options = {
        parentTag: this.tagName,
        nextTagName: afterNextTagName,
        nextTagStr: afterNextTagStr,
        prevTagName,
        prevTagStr: content,
        leadingSpace: this.leadingSpace,
        layer: this.layer,
        keepFormat: this.keepFormat,
      }
      let nextStr
      if (nextTagName != null) {
        nextStr = this.parseValidSubTag(nextTagStr, nextTagName, options)
      } else {
        nextStr = this.parseOnlyString(nextTagStr, nextTagName, options)
      }
      const _currentTagName = nextTagName
      nextTagName = afterNextTagName
      nextTagStr = afterNextTagStr
      if (_currentTagName == null && this.__isEmpty__(nextStr)) {
        continue
      }
      prevTagName = _currentTagName
      this.isFirstTag = false
      content += nextStr
    }
    content = this.afterParsed(content)
    content = this.slim(content)
    if (!this.keepFormat && this.__isEmpty__(content)) return ''
    content = this.beforeMergeSpace(content)
    // 当类似<img>后面跟随<p>情况，需要<p>多空一行
    if (
      !this.noExtraLine &&
      isIndependentTag(this.tagName) &&
      !!this.prevTagName &&
      !content.startsWith('\n') &&
      !isIndependentTag(this.prevTagName) &&
      this.parentTag
    ) {
      prevGap = '\n\n'
    }
    content = this.mergeSpace(content, prevGap, endGap)

    if (this.noWrap && !this.keepFormat) content = content.replace(/\s+/g, ' ')
    content = this.afterMergeSpace(content)
    content = this.beforeReturn(content)
    return content
  }
}

export default Tag

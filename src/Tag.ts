import {
  getTagConstructor,
  getTagAttributes,
  generateGetNextValidTag,
  isSelfClosing,
  isSpacePassingTag,
} from './utils'
import RawString from './tags/__rawString__'
import { SINGLE } from './utils/CONSTANT'
import isIndependentTag from './utils/isIndependentTag'
import { ParseOptions, TagName, TagOptions, TagProps } from './type'
import config from './config'

class Tag implements TagProps {
  constructor(
    str: string,
    tagName: TagName,
    {
      keepSpace = false,
      prevTagName = '',
      nextTagName = '',
      prevTagStr = '',
      nextTagStr = '',
      parentTag = '',
      isFirstSubTag = true,
      calcLeading = false,
      leadingSpace = '',
      layer = 1,
      noWrap = false,
      prevHasEndSpace = false,
      prevHasStartSpace = false,
      match = null,
      indentSpace = '',
      language = '',
      count = 1,
      tableColumnCount = 0,
      noExtraLine = false,
      inTable = false,
    }: TagOptions = {}
  ) {
    this.tagName = tagName
    this.rawStr = str
    this.parentTag = parentTag
    this.prevTagName = prevTagName
    this.nextTagName = nextTagName
    this.prevTagStr = prevTagStr
    this.nextTagStr = nextTagStr
    this.isFirstSubTag = isFirstSubTag
    this.calcLeading = calcLeading
    this.leadingSpace = leadingSpace
    this.layer = layer
    this.noWrap = noWrap
    this.match = match
    this.indentSpace = indentSpace
    this.language = language
    this.count = count
    this.inTable = inTable
    this.tableColumnCount = tableColumnCount
    // 在blockquote内部，如果前面img 后面p 不会再有额外的一行，因为在内部已经处理了
    this.noExtraLine = noExtraLine
    this.prevHasEndSpace = prevHasEndSpace
    this.prevHasStartSpace = prevHasStartSpace
    this.hasStartSpace = false
    this.hasEndSpace = false

    this.keepSpace = keepSpace
    if (!this.__detectStr__(str, this.tagName)) {
      this.attrs = {}
      this.innerHTML = ''
      return
    }
    const { attr, innerHTML } = this.__fetchTagAttrAndInnerHTML__(str)
    if (innerHTML.startsWith(' ') && isSpacePassingTag(tagName)) {
      this.hasStartSpace = true
    }
    if (innerHTML.endsWith(' ') && isSpacePassingTag(tagName)) {
      this.hasEndSpace = true
    }
    this.attrs = attr
    this.innerHTML = innerHTML
  }
  tagName: TagName
  parentTag: TagName
  prevTagName: TagName
  nextTagName: TagName
  rawStr: string
  prevTagStr: string
  nextTagStr: string
  isFirstSubTag: boolean
  calcLeading: boolean
  leadingSpace: string
  layer: number
  noWrap: boolean
  hasEndSpace: boolean
  hasStartSpace: boolean
  prevHasEndSpace: boolean
  prevHasStartSpace: boolean
  match: string | null
  indentSpace: string
  language: string
  count: number
  tableColumnCount: number
  noExtraLine: boolean
  keepSpace: boolean
  inTable: boolean
  attrs: Record<string, string>
  innerHTML: string

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
   * @returns {{attr: {}, innerHTML: *}}
   */
  __fetchTagAttrAndInnerHTML__(str: string) {
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
    const attr = getTagAttributes(openTagAttrs)
    if (this.tagName) delete attr[this.tagName]
    return {
      attr,
      innerHTML: restStr.slice(0, endId),
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
    if (this.keepSpace) return false
    return (
      (str === '' && this.tagName !== 'td') ||
      (this.calcLeading && this.__onlyLeadingSpace__(str))
    )
  }

  getValidSubTagName(subTag: TagName): TagName {
    return subTag
  }

  // 在步骤开始前，处理 tagListener
  beforeParse() {
    const { tagListener } = config.get()
    if (tagListener) {
      const { attrs, language, match } = tagListener(this.tagName, {
        parentTag: this.parentTag,
        prevTagName: this.prevTagName,
        nextTagName: this.nextTagName,
        isFirstSubTag: this.isFirstSubTag,
        attrs: this.attrs,
        innerHTML: this.innerHTML,
        language: this.language,
        match: this.match,
        isSelfClosing: false,
      })
      this.attrs = attrs
      if (typeof language === 'string') this.language = language
      if (typeof match !== 'undefined') this.match = match
    }
    return ''
  }

  // 存在tagName时，解析步骤
  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ): [string, any] {
    const SubTagClass = getTagConstructor(subTagName)
    const subTag = new SubTagClass(subTagStr, subTagName, options)
    return [subTag.exec(), subTag]
  }

  // 不存在tagName时，解析步骤
  parseOnlyString(
    subTagStr: string,
    subTagName: TagName,
    options: ParseOptions
  ): [string, any] {
    const rawString = new RawString(subTagStr, subTagName, options)
    return [rawString.exec(), rawString]
  }

  // 在解析完毕后，此时还并未去除不必要的空行
  afterParsed(content: string) {
    return content
  }

  // 去除不必要的空行
  slim(content: string) {
    // 在代码块内部
    if (this.keepSpace) {
      return content
    }
    return content.trim()
  }

  // 去除不必要的空行后，但在合并必要的空行前
  beforeMergeSpace(content: string) {
    return content
  }

  mergeSpace(content: string, prevGap: string, endGap: string) {
    if (this.keepSpace && this.tagName !== 'pre') {
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
    if (
      isSpacePassingTag(this.prevTagName) &&
      isSpacePassingTag(this.tagName) &&
      this.hasStartSpace &&
      !/^\s+/.test(content) &&
      !/\s+$/.test(this.prevTagStr)
    ) {
      return ' ' + content
    }
    return content
  }

  exec(prevGap = '', endGap = '') {
    let content = this.beforeParse()
    const getNxtValidTag = generateGetNextValidTag(this.innerHTML)
    let [nextTagName, nextTagStr] = getNxtValidTag()
    let prevTagName = null
    let prevHasStartSpace = false
    let prevHasEndSpace = false
    while (nextTagStr !== '') {
      const [afterNextTagName, afterNextTagStr] = getNxtValidTag()
      const options = {
        parentTag: this.tagName,
        nextTagName: afterNextTagName,
        nextTagStr: afterNextTagStr,
        prevTagName,
        prevTagStr: content,
        prevHasEndSpace: prevHasEndSpace,
        prevHasStartSpace: prevHasStartSpace,
        leadingSpace: this.leadingSpace,
        layer: this.layer,
        keepSpace: this.keepSpace,
        inTable: this.inTable,
      }
      let nextStr
      let nextInstance
      if (nextTagName != null) {
        const resultArr = this.parseValidSubTag(
          nextTagStr,
          nextTagName,
          options
        )
        nextStr = resultArr[0]
        nextInstance = resultArr[1]
      } else {
        const resultArr = this.parseOnlyString(nextTagStr, nextTagName, options)
        nextStr = resultArr[0]
        nextInstance = resultArr[1]
        // nextStr = nextStr.replace(/(?:\n\s*)$/, '\n')
      }
      prevHasEndSpace = nextInstance?.hasEndSpace || false
      prevHasStartSpace = nextInstance?.hasStartSpace || false

      const _currentTagName = this.getValidSubTagName(nextTagName)
      nextTagName = afterNextTagName
      nextTagStr = afterNextTagStr
      if (_currentTagName == null && this.__isEmpty__(nextStr)) {
        continue
      }
      if (
        !this.keepSpace &&
        isIndependentTag(prevTagName) &&
        isIndependentTag(_currentTagName)
      ) {
        content = content.replace(/\n+$/, '\n')
        nextStr = nextStr.replace(/^\n+/, '\n')
      }
      prevTagName = _currentTagName
      this.isFirstSubTag = false
      content += nextStr
    }
    content = this.afterParsed(content)
    content = this.slim(content)
    if (this.__isEmpty__(content)) return ''
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

    if (this.noWrap && !this.keepSpace) content = content.replace(/\s+/g, ' ')
    content = this.afterMergeSpace(content)
    content = this.beforeReturn(content)
    return content
  }
}

export default Tag

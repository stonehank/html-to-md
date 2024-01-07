import Tag from '../Tag'
import { ParseOptions, TagOptions } from '../type'
import { getTagConstructor, unescapeStr } from '../utils'

class Code extends Tag {
  constructor(str: string, tagName = 'code', options: TagOptions) {
    super(str, tagName, options)
    this.match = this.match == null ? '`' : this.match
    this.noWrap = this.match === '`'
    this.layer = 1
  }

  beforeMergeSpace(content: string) {
    let startMatch, endMatch
    // 不是在pre内部，并且存在冲突，是多个`组成
    if (this.match !== '' && this.match !== '`') {
      startMatch = this.match + ' '
      endMatch = ' ' + this.match
    } else {
      startMatch = this.match
      endMatch = this.match
    }
    return startMatch + content + endMatch
  }

  // 在嵌套pre中，pre应该视为换行
  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ): [string, any] {
    if (subTagName === 'pre') {
      const SubTagClass = getTagConstructor(subTagName)
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        language: '',
        match: '',
      })
      return [subTag.exec('', '\n'), subTag]
    } else {
      const SubTagClass = getTagConstructor(subTagName)
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        keepSpace: this.keepSpace,
        noWrap: this.noWrap,
      })
      return [subTag.exec('', ''), subTag]
    }
  }

  parseOnlyString(subTagStr: string): [string, any] {
    if (this.match !== '' && !!subTagStr) {
      let count = 1
      if (subTagStr.startsWith('`') || subTagStr.endsWith('`')) {
        count = 2
        if (subTagStr.startsWith('``') || subTagStr.endsWith('``')) {
          count = 3
        }
      }
      this.match = '`'.repeat(count)
    }
    // 将&lt;转换为<，等等
    return [unescapeStr(subTagStr), null]
  }

  slim(content: string) {
    if (this.keepSpace) return content
    return content.trim()
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default Code

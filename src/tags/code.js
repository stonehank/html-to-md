import Tag from '../Tag'
import { getTagConstructor, unescapeStr } from '../utils'

class Code extends Tag {
  constructor(str, tagName = 'code', options) {
    super(str, tagName, options)
    this.match = this.match == null ? '`' : this.match
    this.noWrap = this.match === '`'
    this.layer = 1
  }

  beforeMergeSpace(content) {
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
  parseValidSubTag(subTagStr, subTagName, options) {
    if (subTagName === 'pre') {
      const SubTagClass = getTagConstructor(subTagName)
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        language: '',
        match: '',
      })
      return subTag.exec('', '\n')
    } else {
      const SubTagClass = getTagConstructor(subTagName)
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        keepFormat: this.keepFormat,
        noWrap: this.noWrap,
      })
      return subTag.exec('', '')
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
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
    // console.log(this.keepFormat,JSON.stringify(subTagStr))
    // 将&lt;转换为<，等等
    return unescapeStr(subTagStr)
  }

  slim(content) {
    if (this.keepFormat) return content
    return content.trim()
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default Code

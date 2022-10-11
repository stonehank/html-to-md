const Tag = require('../Tag')
const { __Empty__, __EmptySelfClose__ } = require('./__empty__')
const { getTagConstructor, isSelfClosing, getLanguage } = require('../utils')
const { DOUBLE } = require('../utils/CONSTANT')

/**
 * 在pre内部所有元素，应该转换为 plain text，并入 ``` 内部， 保持格式
 */

class Pre extends Tag {
  constructor(str, tagName = 'pre', options) {
    super(str, tagName, options)
    this.indentSpace = DOUBLE + DOUBLE
    this.isIndent = this.content.includes('```')
    this.match = this.isIndent ? '' : '```'
    this.language = this.language || getLanguage(str)
    this.keepFormat = true
  }

  beforeMergeSpace(content) {
    // 嵌套时
    const before =
      this.isIndent || this.parentTag === 'code'
        ? ''
        : this.match + this.language + '\n'
    let gap = ''
    if (!content.endsWith('\n')) gap = '\n'
    const after =
      this.isIndent || this.parentTag === 'code' ? '' : gap + this.match
    return before + content + after
  }

  fillPerLine(lineStr) {
    let leadingSpace = ''
    if (this.calcLeading) {
      leadingSpace = this.leadingSpace
    }
    if (this.isIndent) {
      return leadingSpace + this.indentSpace + lineStr
    }
    return leadingSpace + lineStr
  }

  afterMergeSpace(content) {
    let split = content.split('\n')
    split = split.map((n) => {
      if (n === '') return ''
      return this.fillPerLine(n)
    })
    return split.join('\n')
  }

  parseValidSubTag(subTagStr, subTagName, options) {
    if (subTagName === 'code') {
      const SubTagClass = getTagConstructor(subTagName)
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        match: '',
        language: this.language,
        keepFormat: true,
      })
      return subTag.exec('', '')
    } else {
      let emptyTag
      if (isSelfClosing(subTagName)) {
        emptyTag = new __EmptySelfClose__(subTagStr, subTagName)
      } else {
        emptyTag = new __Empty__(subTagStr, subTagName, {
          ...options,
          keepFormat: true,
        })
      }
      return emptyTag.exec()
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return subTagStr
  }

  slim(content) {
    return content
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

module.exports = Pre

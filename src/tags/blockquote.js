const isIndependentTag = require('../utils/isIndependentTag')
const Tag = require('../Tag')
const { getTagConstructor } = require('../utils')

class Blockquote extends Tag {
  constructor(str, tagName = 'blockquote', options) {
    super(str, tagName, options)
    this.match = this.match || '>'
    this.fillPerLine = this.fillPerLine.bind(this)
  }

  beforeMergeSpace(content) {
    if (content.trim() === '') return ''
    const matchStr = this.match + ' ' + content
    if (this.calcLeading) {
      return this.leadingSpace + matchStr
    }
    return matchStr
  }

  afterMergeSpace(content) {
    let split = content.split('\n')
    // 去除连续
    for (let i = split.length - 1; i >= 0; i--) {
      if (
        i < split.length - 1 &&
        split[i].trim() === '>' &&
        split[i + 1].trim() === '>'
      ) {
        split.splice(i, 1)
      }
    }
    split = split.map((n) => {
      if (n === '') return ''
      return this.fillPerLine(n)
    })
    // console.log(content,split)
    return split.join('\n')
  }

  beforeReturn(content) {
    // 去除空行
    return content.replace('\n\n', '\n')
  }

  fillPerLine(lineStr) {
    let startWith = '>'
    if (this.calcLeading) {
      startWith = this.leadingSpace + '>'
    }
    if (!lineStr.startsWith(startWith)) {
      const matchStr = this.match + ' ' + lineStr
      if (this.calcLeading) {
        return this.leadingSpace + matchStr
      }
      return matchStr
    }
    return lineStr
  }

  parseValidSubTag(subTagStr, subTagName, options) {
    let subTag
    if (subTagName === 'blockquote') {
      const SubTagClass = getTagConstructor(subTagName)
      subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        calcLeading: this.calcLeading,
        match: this.match + '>',
        noExtraLine: true,
      })
    } else {
      const SubTagClass = getTagConstructor(subTagName)
      subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        noExtraLine: true,
      })
    }
    let str = subTag.exec()
    let leadingSpace = ''
    if (this.calcLeading) {
      leadingSpace = this.leadingSpace
    }
    const prevNeedNewLine =
      isIndependentTag(options.prevTagName) && options.prevTagName !== 'br'
    const nextNeedNewLine =
      isIndependentTag(options.nextTagName) && options.nextTagName !== 'br'
    const needNewLine = isIndependentTag(subTagName) && subTagName !== 'br'
    if (this.isFirstTag) {
      return str.trimLeft().replace(leadingSpace, '')
    } else {
      if (needNewLine) {
        str = leadingSpace + this.match + str
        if (!prevNeedNewLine) {
          str = '\n' + str
        }
        if (
          !nextNeedNewLine &&
          options.nextTagStr &&
          options.nextTagStr.trim()
        ) {
          str += this.match + '\n'
        }
      } else {
        if (prevNeedNewLine) {
          return leadingSpace + this.match + '\n' + str
        }
        return str
      }
    }
    return str
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

module.exports = Blockquote

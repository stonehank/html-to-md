import Tag from '../Tag'
import { __Empty__, __EmptySelfClose__ } from './__empty__'
import { getTagConstructor, isSelfClosing, getLanguage } from '../utils'
import { DOUBLE } from '../utils/CONSTANT'
import { ParseOptions, TagOptions } from '../type'

/**
 * 在pre内部所有元素，应该转换为 plain text，并入 ``` 内部， 保持格式
 */

class Pre extends Tag {
  isIndent: boolean
  constructor(str: string, tagName = 'pre', options: TagOptions) {
    super(str, tagName, options)
    this.indentSpace = DOUBLE + DOUBLE
    this.isIndent = this.innerHTML.includes('```')
    this.match = this.isIndent ? '' : '```'
    this.language = this.language || getLanguage(str)
    this.keepSpace = true
  }

  beforeMergeSpace(content: string) {
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

  fillPerLine(lineStr: string) {
    let leadingSpace = ''
    if (this.calcLeading) {
      leadingSpace = this.leadingSpace
    }
    if (this.isIndent) {
      return leadingSpace + this.indentSpace + lineStr
    }
    return leadingSpace + lineStr
  }

  afterMergeSpace(content: string) {
    let split = content.split('\n')
    split = split.map((n) => {
      if (n === '') return ''
      return this.fillPerLine(n)
    })
    return split.join('\n')
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ) {
    if (subTagName === 'code') {
      const SubTagClass = getTagConstructor(subTagName)
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        match: '',
        language: this.language,
        keepSpace: true,
      })
      return subTag.exec('', '')
    } else {
      let emptyTag
      if (isSelfClosing(subTagName)) {
        emptyTag = new __EmptySelfClose__(subTagStr, subTagName)
      } else {
        emptyTag = new __Empty__(subTagStr, subTagName, {
          ...options,
          keepSpace: true,
        })
      }
      return emptyTag.exec()
    }
  }

  parseOnlyString(subTagStr: string) {
    return subTagStr
  }

  slim(content: string) {
    return content
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

export default Pre

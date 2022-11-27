import Tag from '../Tag'
import { getTagConstructor } from '../utils'
import isIndependentTag from '../utils/isIndependentTag'
import { DOUBLE, TRIPLE } from '../utils/CONSTANT'
import { ParseOptions, TagName, TagOptions } from '../type'

/**
 * 内部含有p， 如果是第一个元素，需要最后额外加一个\n，否则开始额外加一个\n
 * 在li内部的元素需要layer，单内部元素的内部则不需要layer
 * 在li内部第一个元素，需要去除所有layer空格，但是原本如果有空行，需要保留空行
 * 在li内部的字符串，只有换行了，才需要layer
 */
class Li extends Tag {
  extraGap: string
  constructor(str: string, tagName = 'li', options: TagOptions) {
    super(str, tagName, options)
    // 在没有UL的情况下
    this.match = this.match || '*'
    this.extraGap = ''
  }

  beforeMergeSpace(content: string) {
    return this.extraGap + this.leadingSpace + this.match + ' ' + content
  }

  __calcNextLeading__() {
    console.log('__calcNextLeading__', this.match)
    return this.match?.length === 1
      ? DOUBLE
      : this.match?.length === 2
      ? TRIPLE
      : this.match?.length === 3
      ? DOUBLE
      : TRIPLE + DOUBLE
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ) {
    const SubTagClass = getTagConstructor(subTagName)
    const nextLeading = this.__calcNextLeading__()
    const subTag = new SubTagClass(subTagStr, subTagName, {
      ...options,
      calcLeading: true,
      leadingSpace: this.leadingSpace + nextLeading,
      layer: this.layer + 1,
    })
    const str = subTag.exec()
    if (subTagName === 'p') {
      this.extraGap = '\n'
    }
    if (this.isFirstSubTag) {
      return str.trimLeft().replace(this.leadingSpace + nextLeading, '')
    } else {
      return str
    }
  }

  parseOnlyString(
    subTagStr: string,
    subTagName: TagName,
    options: ParseOptions
  ) {
    let calcLeading = false
    if (isIndependentTag(options.prevTagName)) {
      calcLeading = true
    }
    const nextLeading = this.__calcNextLeading__()
    const str = super.parseOnlyString(subTagStr, subTagName, {
      ...options,
      calcLeading,
      leadingSpace: this.leadingSpace + nextLeading,
      layer: this.layer + 1,
    })
    if (this.isFirstSubTag) {
      return str.replace(this.leadingSpace + nextLeading, '')
    } else {
      return str
    }
  }

  beforeReturn(content: string) {
    return super.beforeReturn(content)
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

export default Li

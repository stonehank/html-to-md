import Tag from '../Tag'
import __Ignore__ from './__ignore__'
import { getTagConstructor } from '../utils'
import config from '../config'
import { ParseOptions, TagName, TagOptions } from '../type'

class Ol extends Tag {
  constructor(str: string, tagName = 'ol', options: TagOptions) {
    super(str, tagName, options)
    const attrStartNum = parseInt(this?.attrs?.start, 10)
    this.count = isNaN(attrStartNum) ? 1 : attrStartNum
  }

  __isValidSubTag__(subTagName: TagName): boolean {
    if (!subTagName) return false
    const { aliasTags } = config.get()
    const SubTagClass = getTagConstructor(subTagName)
    return (
      subTagName === 'li' ||
      aliasTags?.[subTagName] == 'li' ||
      SubTagClass === __Ignore__
    )
  }

  getValidSubTagName(subTagName: TagName) {
    if (!subTagName) return null
    return this.__isValidSubTag__(subTagName) ? subTagName : null
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ): [string, any] {
    const SubTagClass = getTagConstructor(subTagName)
    if (this.__isValidSubTag__(subTagName)) {
      const match = this.count + '.'
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        calcLeading: true,
        leadingSpace: this.leadingSpace,
        layer: this.layer,
        match,
      })
      this.count++
      return [subTag.exec('', '\n'), subTag]
    } else {
      console.error(
        'Should not have tags except <li> inside ol, current tag is ' +
          subTagName +
          ', current tagStr is' +
          subTagStr
      )
      return ['', null]
    }
  }

  parseOnlyString(): [string, any] {
    return ['', null]
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

export default Ol

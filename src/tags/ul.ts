import Tag from '../Tag'
import __Ignore__ from './__ignore__'
import { getTagConstructor } from '../utils'
import config from '../config'
import { ParseOptions, TagName, TagOptions } from '../type'
const { aliasTags } = config.get()

class Ul extends Tag {
  constructor(str: string, tagName = 'ul', options: TagOptions) {
    super(str, tagName, options)
  }

  __isValidSubTag__(subTagName: TagName): boolean {
    if (!subTagName) return false
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
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        calcLeading: true,
        leadingSpace: this.leadingSpace,
        layer: this.layer,
        match: '*',
      })
      return [subTag.exec('', '\n'), subTag]
    } else {
      console.error(
        'Should not have tags except <li> inside ul, current tag is ' +
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

export default Ul

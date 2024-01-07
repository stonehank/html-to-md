import Tag from '../Tag'
import __Ignore__ from './__ignore__'
import { getTagConstructor } from '../utils'
import config from '../config'
import { ParseOptions, TagOptions } from '../type'

class Tr extends Tag {
  constructor(str: string, tagName = 'tr', options: TagOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content: string) {
    return this.leadingSpace + '|' + content
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ): [string, any] {
    const { aliasTags } = config.get()
    const SubTagClass = getTagConstructor(subTagName)
    if (
      subTagName !== 'td' &&
      subTagName !== 'th' &&
      aliasTags?.[subTagName] !== 'td' &&
      aliasTags?.[subTagName] !== 'th' &&
      SubTagClass !== __Ignore__
    ) {
      console.error(
        `Should not have tags except <td> or <th> inside <tr>, current tag is ${subTagName} have been ignore.`
      )
      return ['', null]
    } else {
      const subTag = new SubTagClass(subTagStr, subTagName, options)
      return [subTag.exec('', ''), subTag]
    }
  }

  parseOnlyString(): [string, any] {
    return ['', null]
  }

  exec(prevGap = '', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}
export default Tr

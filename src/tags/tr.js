import Tag from '../Tag'
import __Ignore__ from './__ignore__'
import { getTagConstructor } from '../utils'
import config from '../config'
const { aliasTags } = config.get()

class Tr extends Tag {
  constructor(str, tagName = 'tr', options) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content) {
    return '|' + content
  }

  parseValidSubTag(subTagStr, subTagName, options) {
    const SubTagClass = getTagConstructor(subTagName)
    if (
      subTagName !== 'td' &&
      subTagName !== 'th' &&
      aliasTags[subTagName] !== 'td' &&
      aliasTags[subTagName] !== 'th' &&
      SubTagClass !== __Ignore__
    ) {
      console.error(
        `Should not have tags except <td> or <th> inside <tr>, current tag is ${subTagName} have been ignore.`
      )
      return ''
    } else {
      const subTag = new SubTagClass(subTagStr, subTagName, options)
      return subTag.exec('', '')
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  exec(prevGap = '', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}
export default Tr

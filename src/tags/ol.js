import Tag from '../Tag'
import __Ignore__ from './__ignore__'
import { getTagConstructor } from '../utils'
import config from '../config'
const { aliasTags } = config.get()

class Ol extends Tag {
  constructor(str, tagName = 'ol', options) {
    super(str, tagName, options)
    this.count = this.attrs.start || 1
  }

  parseValidSubTag(subTagStr, subTagName, options) {
    const SubTagClass = getTagConstructor(subTagName)
    if (
      subTagName !== 'li' &&
      aliasTags[subTagName] !== 'li' &&
      SubTagClass !== __Ignore__
    ) {
      console.error(
        'Should not have tags except <li> inside ol, current tag is ' +
          subTagName +
          ', current tagStr is' +
          subTagStr
      )
      return ''
    } else {
      const match = this.count + '. '
      const subTag = new SubTagClass(subTagStr, subTagName, {
        ...options,
        calcLeading: true,
        leadingSpace: this.leadingSpace,
        layer: this.layer,
        match,
      })
      this.count++
      return subTag.exec('', '\n')
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

export default Ol

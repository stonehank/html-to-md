import Th from './th'

class Td extends Th {
  constructor(str, tagName = 'td', options) {
    super(str, tagName, options)
  }

  parseValidSubTag(subTagStr, subTagName, options) {
    if (
      subTagName === 'ul' ||
      subTagName === 'ol' ||
      subTagName === 'table' ||
      subTagName === 'pre'
    ) {
      return subTagStr.replace(/([\n\r])/g, '')
    }
    return super.parseValidSubTag(subTagStr, subTagName, options)
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Td

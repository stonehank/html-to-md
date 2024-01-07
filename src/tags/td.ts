import { ParseOptions, TagOptions } from '../type'
import Th from './th'

class Td extends Th {
  constructor(str: string, tagName = 'td', options: TagOptions) {
    super(str, tagName, options)
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ) : [string, any] {
    if (
      subTagName === 'ul' ||
      subTagName === 'ol' ||
      subTagName === 'table' ||
      subTagName === 'pre'
    ) {
      return [subTagStr.replace(/([\n\r])/g, ''), null]
    }
    return super.parseValidSubTag(subTagStr, subTagName, options)
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Td

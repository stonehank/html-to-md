import Tag from '../Tag'
import { ParseOptions, TagOptions } from '../type'

class Th extends Tag {
  constructor(str: string, tagName = 'th', options: TagOptions) {
    super(str, tagName, options)
    this.tagName = tagName
  }

  beforeMergeSpace(content: string) {
    return content + '|'
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ): [string, any] {
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
export default Th

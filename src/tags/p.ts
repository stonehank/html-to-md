import Tag from '../Tag'
import { ParseOptions } from '../type'

class P extends Tag {
  constructor(str: string, tagName = 'p', options: ParseOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content: string) {
    if (this.calcLeading) {
      return this.leadingSpace + content
    }
    return content
  }

  exec(prevGap = '\n', endGap = '\n') {
    if (
      !this.prevTagName &&
      !!this.prevTagStr &&
      !this.prevTagStr.endsWith('\n')
    ) {
      prevGap = '\n\n'
    }
    if (
      !this.nextTagName &&
      !!this.nextTagStr &&
      !this.nextTagStr.startsWith('\n')
    ) {
      endGap = '\n\n'
    }
    if (this.inTable) {
      prevGap = ''
      endGap = ''
    }
    return super.exec(prevGap, endGap)
  }
}

export default P

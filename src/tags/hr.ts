import SelfCloseTag from '../SelfCloseTag'
import { SelfCloseTagOptions } from '../type'

class Hr extends SelfCloseTag {
  constructor(str: string, tagName = 'hr', options: SelfCloseTagOptions) {
    super(str, tagName, options)
    this.match = '---'
  }

  beforeMergeSpace() {
    const leadingSpace = this.leadingSpace
    return leadingSpace + this.match
  }

  beforeReturn(content: string) {
    content.replace(/^(?:\n\s*)/, '\n\n').replace(/(?:\n\s*)$/, '\n\n')
    return content
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

export default Hr

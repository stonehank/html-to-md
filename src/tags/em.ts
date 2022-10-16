import Tag from '../Tag'
import { TagOptions } from '../type'

class Em extends Tag {
  constructor(str: string, tagName = 'em', options: TagOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content: string) {
    return '*' + content + '*'
  }

  exec(prevGap = '', endGap = '') {
    if (this.parentTag === 'strong' && this.nextTagStr) endGap = ' '
    if (
      this.prevTagStr &&
      !this.prevTagStr.endsWith('\\*') &&
      this.prevTagStr.endsWith('*')
    )
      prevGap = ' '
    return super.exec(prevGap, endGap)
  }
}

export default Em

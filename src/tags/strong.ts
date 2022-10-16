import Tag from '../Tag'
import { TagOptions } from '../type'

class Strong extends Tag {
  constructor(str: string, tagName = 'strong', options: TagOptions) {
    super(str, tagName, options)
    this.layer = 1
  }

  beforeMergeSpace(content: string) {
    return '**' + content + '**'
  }

  exec(prevGap = '', endGap = '') {
    if (this.prevTagStr && this.prevTagStr.endsWith('*')) prevGap = ' '
    return super.exec(prevGap, endGap)
  }
}

export default Strong

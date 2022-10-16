import Tag from '../Tag'
import { TagOptions } from '../type'

class Span extends Tag {
  constructor(str: string, tagName = 'span', options: TagOptions) {
    super(str, tagName, options)
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default Span

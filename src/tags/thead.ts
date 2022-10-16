import Tag from '../Tag'
import { TagOptions } from '../type'

class Thead extends Tag {
  constructor(str: string, tagName = 'thead', options: TagOptions) {
    super(str, tagName, options)
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Thead

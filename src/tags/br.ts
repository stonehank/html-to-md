import SelfCloseTag from '../SelfCloseTag'
import { TagOptions } from '../type'
import { escapeStr } from '../utils/escape'

class Br extends SelfCloseTag {
  constructor(str: string, tagName = 'b', options: TagOptions) {
    super(str, tagName, options)
  }

  exec(prevGap: string, endGap = '\n') {
    if (this.inTable) return escapeStr('<br />')
    return '  ' + endGap
  }
}

export default Br

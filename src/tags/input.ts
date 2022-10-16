import SelfCloseTag from '../SelfCloseTag'
import { SelfCloseTagOptions } from '../type'

class Input extends SelfCloseTag {
  constructor(str: string, tagName = 'input', options: SelfCloseTagOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace() {
    const { type, checked } = this.attrs
    if (this.parentTag === 'li' && type === 'checkbox') {
      return checked != null ? '[x] ' : '[ ] '
    }
    return ''
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Input

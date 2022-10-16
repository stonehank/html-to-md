import SelfCloseTag from '../SelfCloseTag'
import { SelfCloseTagOptions } from '../type'

class Img extends SelfCloseTag {
  constructor(str: string, tagName = 'img', options: SelfCloseTagOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace() {
    let { src, alt } = this.attrs
    if (!alt) alt = ''
    if (!src) src = ''
    return `![${alt}](${src})`
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Img

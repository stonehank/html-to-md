import SelfCloseTag from '../SelfCloseTag'

class Img extends SelfCloseTag {
  constructor(str, tagName = 'img', options) {
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

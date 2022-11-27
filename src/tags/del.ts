import Tag from '../Tag'

class Del extends Tag {
  constructor(str: string, tagName = 'del') {
    super(str, tagName)
    this.match = this.match || '~~'
  }

  beforeMergeSpace(content: string) {
    return this.match + content + this.match
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default Del

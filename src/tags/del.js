import Tag from '../Tag'

class Del extends Tag {
  constructor(str, tagName = 'del') {
    super(str, tagName)
  }

  beforeMergeSpace(content) {
    return '~~' + content + '~~'
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default Del

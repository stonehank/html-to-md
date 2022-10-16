import Tag from '../Tag'

class Del extends Tag {
  constructor(str: string, tagName = 'del') {
    super(str, tagName)
  }

  beforeMergeSpace(content: string) {
    return '~~' + content + '~~'
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default Del

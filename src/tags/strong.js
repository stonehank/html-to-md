import Tag from '../Tag'

class Strong extends Tag {
  constructor(str, tagName = 'strong', options) {
    super(str, tagName, options)
    this.layer = 1
  }

  beforeMergeSpace(content) {
    return '**' + content + '**'
  }

  exec(prevGap = '', endGap = '') {
    // console.log('strong',this.options)
    if (this.prevTagStr && this.prevTagStr.endsWith('*')) prevGap = ' '
    return super.exec(prevGap, endGap)
  }
}

export default Strong

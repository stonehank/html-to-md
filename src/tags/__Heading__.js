import Tag from '../Tag'

class __Heading__ extends Tag {
  constructor(str, tagName = 'h1') {
    super(str, tagName)
  }

  beforeMergeSpace(content) {
    return '# ' + content
  }

  exec(prevGap, endGap) {
    if (!prevGap) prevGap = '\n'
    if (!endGap) endGap = '\n'
    return super.exec(prevGap, endGap)
  }
}

export default __Heading__

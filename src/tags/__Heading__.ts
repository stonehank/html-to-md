import Tag from '../Tag'

class __Heading__ extends Tag {
  constructor(str: string, tagName = 'h1') {
    super(str, tagName)
  }

  beforeMergeSpace(content: string) {
    return '# ' + content
  }

  exec(prevGap: string, endGap: string) {
    if (!prevGap) prevGap = '\n'
    if (!endGap) endGap = '\n'
    return super.exec(prevGap, endGap)
  }
}

export default __Heading__

const __Heading__ = require('./__Heading__')

class H1 extends __Heading__ {
  constructor (str, tagName = 'h1') {
    super(str, tagName)
  }

  beforeMergeSpace (content) {
    return '# ' + content
  }

  exec (prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

module.exports = H1

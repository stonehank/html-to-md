const SelfCloseTag = require('../SelfCloseTag')

class Hr extends SelfCloseTag {
  constructor(str, tagName = 'hr', options) {
    super(str, tagName, options)
  }

  beforeMergeSpace() {
    const leadingSpace = this.leadingSpace
    return leadingSpace + '---'
  }

  beforeReturn(content) {
    content.replace(/^(\n\s*)+/, '\n\n').replace(/(\n\s*)+$/, '\n\n')
    return content
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

module.exports = Hr

const SelfCloseTag = require('../SelfCloseTag')

class Input extends SelfCloseTag {
  constructor(str, tagName = 'input', options) {
    super(str, tagName, options)
  }

  beforeMergeSpace() {
    const { type, checked } = this.attrs
    if (this.parentTag === 'li' && type === 'checkbox') {
      return checked != null ? '[x] ' : '[ ] '
    }
    return ''
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
module.exports = Input

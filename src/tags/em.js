const Tag = require('../Tag')

class Em extends Tag {
  constructor (str, tagName = 'em', options) {
    super(str, tagName, options)
  }

  beforeMergeSpace (content) {
    return '*' + content + '*'
  }

  exec (prevGap = '', endGap = '') {
    if (this.parentTag === 'strong' && this.nextTagStr)endGap = ' '
    if (this.prevTagStr && !this.prevTagStr.endsWith('\\*') && this.prevTagStr.endsWith('*'))prevGap = ' '
    return super.exec(prevGap, endGap)
  }
}

module.exports = Em

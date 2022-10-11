const SelfCloseTag = require('../SelfCloseTag')

class Br extends SelfCloseTag {
  constructor(str, tagName = 'b', options) {
    super(str, tagName, options)
  }

  exec(prevGap, endGap = '\n') {
    return '  ' + endGap
  }
}

module.exports = Br

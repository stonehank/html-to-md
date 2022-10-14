import SelfCloseTag from '../SelfCloseTag'

class Br extends SelfCloseTag {
  constructor(str, tagName = 'b', options) {
    super(str, tagName, options)
  }

  exec(prevGap, endGap = '\n') {
    return '  ' + endGap
  }
}

export default Br

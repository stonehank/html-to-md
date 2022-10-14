import Tag from '../Tag'

class Thead extends Tag {
  constructor(str, tagName = 'thead', options) {
    super(str, tagName, options)
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Thead

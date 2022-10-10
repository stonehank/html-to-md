const Tag = require('../Tag')
const { getTableAlign } = require('../utils')

class Tbody extends Tag {
  constructor(str, tagName = 'tbody', options) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content) {
    const alignArr = getTableAlign(this.content, this.tableColumnCount)
    let tableHr = '|'
    for (let i = 0; i < alignArr.length; i++) {
      tableHr += alignArr[i]
    }
    return tableHr + '\n' + content
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
module.exports = Tbody

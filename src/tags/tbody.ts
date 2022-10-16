import Tag from '../Tag'
import { TagOptions } from '../type'
import { getTableAlign } from '../utils'

class Tbody extends Tag {
  constructor(str: string, tagName = 'tbody', options: TagOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content: string) {
    const alignArr = getTableAlign(this.content, this.tableColumnCount)
    let tableHr = '|'
    for (let i = 0; i < alignArr.length; i++) {
      tableHr += alignArr[i]
    }
    return tableHr + '\n' + content
  }

  parseOnlyString() {
    return ''
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}
export default Tbody

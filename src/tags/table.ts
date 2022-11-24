import Tag from '../Tag'
import { ParseOptions, TagOptions } from '../type'
import { getTagConstructor, getTableAlign } from '../utils'

function countTdNum(str: string) {
  let trStr = ''
  for (let i = 0; i < str.length; i++) {
    if (trStr.endsWith('</tr>')) {
      break
    }
    trStr += str[i]
  }
  return Math.max(
    trStr.split('</td>').length - 1,
    trStr.split('</th>').length - 1
  )
}

class Table extends Tag {
  exist_thead: boolean
  exist_tbody: boolean
  empty_tbody: boolean
  constructor(str: string, tagName = 'table', options: TagOptions) {
    super(str, tagName, options)
    this.exist_thead = false
    this.exist_tbody = false
    this.empty_tbody = true
    this.tableColumnCount = countTdNum(this.innerHTML)
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: string,
    options: ParseOptions
  ) {
    if (subTagName === 'thead') {
      this.exist_thead = true
    }
    if (subTagName === 'tbody') {
      this.exist_tbody = true
      this.empty_tbody = false
    }
    if (subTagName === 'tr') {
      this.empty_tbody = false
    }
    const SubTagClass = getTagConstructor(subTagName)
    const subTag = new SubTagClass(subTagStr, subTagName, {
      ...options,
      tableColumnCount: this.tableColumnCount,
    })
    return subTag.exec('', '\n')
  }

  parseOnlyString() {
    return ''
  }

  beforeReturn(str: string) {
    // 无head，无body
    if (!(this.exist_thead || this.exist_tbody || !this.empty_tbody)) return ''
    // 无内容
    if (this.tableColumnCount === 0) return ''
    // 无body 或者 空body
    if (!this.exist_tbody) {
      // 从head中获取方向信息
      const alignArr = getTableAlign(this.innerHTML, this.tableColumnCount)
      let tableHr = '|'
      for (let i = 0; i < alignArr.length; i++) {
        tableHr += alignArr[i]
      }
      if (this.empty_tbody) {
        str = str + tableHr + '\n'
      } else {
        str = tableHr + '' + str
      }
    }
    // 无head
    if (!this.exist_thead)
      str =
        '\n' +
        '|'.repeat(this.tableColumnCount + 1) +
        (str.startsWith('\n') ? '' : '\n') +
        str
    return str
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}
export default Table

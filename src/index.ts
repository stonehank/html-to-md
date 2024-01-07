import { getTagConstructor, unescapeStr, clearComment } from './utils'
import config from './config'
import { Html2MdOptions } from './type'
import { DOUBLE } from './utils/CONSTANT'

function html2md(str: string, options?: Html2MdOptions, force = false): string {
  config.reset()
  config.set(options, force)
  str = clearComment(str)
  str = str.trim()
  str = str.replace(/(\r\n)/g, '').replace(/&nbsp;/g, ' ')
  str = `<${DOUBLE}skip${DOUBLE}>${str}</${DOUBLE}skip${DOUBLE}>`
  let res = ''
  const prevTagName = null
  const nextTagName = `${DOUBLE}skip${DOUBLE}`
  const nextTagStr = str
  const SubTagClass = getTagConstructor(nextTagName)
  const parseOptions = {
    parentTag: null,
    prevTagName,
    prevTagStr: res,
  }
  const subTag = new SubTagClass(nextTagStr, nextTagName, parseOptions)
  const subContent = subTag.exec()
  res += subContent
  return beforeReturn(unescapeStr(res))
}

function beforeReturn(str: string) {
  // console.log('beforeReturn', str)
  str = str.replace(/^\s+/, '')
  str = str.replace(/\s+$/, '')
  str = str.replace(/☈/g, ' ')
  return str
}

export default html2md

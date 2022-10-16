import isSelfClosing from './isSelfClosing'

function getTagName(str: string, idx: number) {
  let name = ''
  while (idx < str.length && /[a-zA-Z0-9!-]/.test(str[idx])) {
    name += str[idx++]
  }

  return name.toLowerCase()
}
// 找到下一个有效tag， 可多次调用，返回[tagName, tagContent]
// 例如: <b>abc</b><i>abc</i>， 返回['b', '<b>abc</b>']
function generateGetNextValidTag(str: string) {
  let startId = 0
  return (): [string | null, string] => {
    let res = ''
    let startTagName: string | null = null
    let count = 0
    let endTagName: string | null = null
    let canBeBreak = false
    if (startId >= str.length) {
      return [startTagName, res]
    }
    for (let i = startId; i < str.length; i++) {
      if (str[i] === '<' && str[i + 1] !== '/') {
        if (res !== '' && startTagName == null && !canBeBreak) {
          startId = i
          return [startTagName, res]
        }
        const tempName = getTagName(str, i + 1)
        if (startTagName == null) {
          startTagName = tempName
        }
        if (startTagName === tempName) count++

        if (isSelfClosing(startTagName)) {
          count--
          if (count === 0) canBeBreak = true
          if (count < 0) console.warn(`Tag ${startTagName} is abnormal`)
        }
      } else if (str[i] === '<' && str[i + 1] === '/') {
        if (startTagName == null) {
          console.warn(
            `Tag is not integrity, current tagStr is ${str.slice(startId)}`
          )
          let id = i
          while (id < str.length && str[id] !== '>') {
            id++
          }
          i = id
          continue
        }
        endTagName = getTagName(str, i + 2)
        if (startTagName === endTagName) {
          count--
        }
        if (count <= 0) canBeBreak = true
      }
      res += str[i]
      if (str[i] === '>' && canBeBreak) {
        startId = i + 1
        return [startTagName, res]
      }
      if (i === str.length - 1) {
        if (startTagName !== endTagName) {
          if (endTagName != null && startTagName != null) {
            res = res
              .replace(`<${startTagName}>`, '')
              .replace(`</${endTagName}>`, '')
          }
          startTagName = null
        }
      }
    }

    startId = str.length
    return [startTagName, res]
  }
}

export default generateGetNextValidTag

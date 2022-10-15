const regType: Record<string, RegExp> = {
  all: /\s/,
  linebreak: /\n/,
  whitespace: /([ \t])/,
}

function trim(
  str: string,
  {
    type = 'whitespace' || 'linebreak' || 'all',
    ori = 'left' || 'right' || 'all',
  } = {}
): string {
  if (!str) return ''
  const { leftSpace, rightSpace, content } = parse(str)
  const reg: RegExp = regType[type]
  if (ori === 'left') {
    return filter(leftSpace, reg) + content + rightSpace
  } else if (ori === 'right') {
    return leftSpace + content + filter(rightSpace, reg)
  } else if (ori === 'all') {
    return filter(leftSpace, reg) + content + filter(rightSpace, reg)
  }
  return str
}

function filter(str: string, reg: RegExp): string {
  let newStr = ''
  for (let i = 0; i < str.length; i++) {
    if (reg.test(str[i])) continue
    newStr += str[i]
  }
  return newStr
}

function parse(str: string): {
  leftSpace: string
  rightSpace: string
  content: string
} {
  let leftSpace = ''
  let rightSpace = ''
  let leftEndIdx = -1
  let rightStartIdx = -1
  for (let i = 0; i < str.length; i++) {
    if (/\s/.test(str[i])) {
      leftSpace += str[i]
    } else {
      leftEndIdx = i
      break
    }
  }
  for (let i = str.length - 1; i >= 0; i--) {
    if (/\s/.test(str[i])) {
      rightSpace = str[i] + rightSpace
    } else {
      rightStartIdx = i
      break
    }
  }
  return {
    leftSpace,
    rightSpace,
    content: str.slice(leftEndIdx, rightStartIdx + 1),
  }
}

export default trim

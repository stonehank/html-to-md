function getTagAttributes(attrStr: string): Record<string, string> {
  const attrsObj: Record<string, string> = {}
  let inside = false
  let key = ''
  let value = ''
  let quote = null
  for (let i = 0; i <= attrStr.length; i++) {
    if (i === attrStr.length || /\s/.test(attrStr[i])) {
      if (i === attrStr.length || !inside) {
        let slimKey = key.trim()
        if (slimKey[slimKey.length - 1] === '/') {
          slimKey = slimKey.slice(0, slimKey.length - 1)
        }
        if (slimKey) {
          attrsObj[slimKey] = value.trim()
        }
        key = ''
        value = ''
      }
    } else if (/['"]/.test(attrStr[i]) && (!quote || attrStr[i] === quote)) {
      // todo add test case
      inside = !inside
      if (inside) quote = attrStr[i]
      continue
      // only pass not inside attr value (https://github.com/stonehank/html-to-md/issues/43)
    } else if (attrStr[i] === '=' && !inside) {
      continue
    }
    if (i === attrStr.length) break
    if (!inside) key += attrStr[i]
    else value += attrStr[i]
  }

  return attrsObj
}

export default getTagAttributes

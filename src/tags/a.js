import Tag from '../Tag'

class A extends Tag {
  constructor(str, tagName = 'a', options) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content) {
    let { href, title } = this.attrs
    if (!href) {
      href = ''
    }
    if (title) {
      return `[${content}](${href} "${title}")`
    }
    return `[${content}](${href})`
  }

  parseOnlyString(subTagStr, subTagName, options) {
    if (this.parentTag === 'tbody' || this.parentTag === 'thead') {
      return subTagStr
    }
    return super.parseOnlyString(subTagStr, subTagName, options)
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap)
  }
}

export default A

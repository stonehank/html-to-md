import Tag from '../Tag'
import { ParseOptions, TagName, TagOptions } from '../type'

class A extends Tag {
  constructor(str: string, tagName = 'a', options: TagOptions) {
    super(str, tagName, options)
  }

  beforeMergeSpace(content: string) {
    const { href, title } = this.attrs
    const validHref = href ? href : ''
    if (title) {
      return `[${content}](${validHref} "${title}")`
    }
    return `[${content}](${validHref})`
  }

  parseOnlyString(
    subTagStr: string,
    subTagName: TagName,
    options: ParseOptions
  ) {
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

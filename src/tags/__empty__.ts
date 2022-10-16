import Tag from '../Tag'
import SelfCloseTag from '../SelfCloseTag'
import { ParseOptions, TagName, TagOptions } from '../type'
/*
 *
 * <div><b>abc</b></div>
 * ==> abc
 *
 * */
class __Empty__ extends Tag {
  constructor(
    str: string,
    tagName: TagName = '__empty__',
    options: TagOptions
  ) {
    super(str, tagName, options)
  }

  slim(content: string) {
    return content
  }

  parseValidSubTag(
    subTagStr: string,
    subTagName: TagName,
    options: ParseOptions
  ) {
    return new __Empty__(subTagStr, subTagName, {
      ...options,
    }).exec()
  }

  parseOnlyString(subTagStr: string, subTagName: null, options: ParseOptions) {
    return subTagStr
  }

  exec() {
    return super.exec('', '')
  }
}

class __EmptySelfClose__ extends SelfCloseTag {
  constructor(str: string, tagName = '__emptyselfclose__') {
    super(str, tagName)
    this.tagName = tagName
  }

  exec() {
    return super.exec('', '')
  }
}

export { __Empty__, __EmptySelfClose__ }

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
    subTagName: string,
    options: ParseOptions
  ): [string, any] {
    if (this.tagName === '__skip__') {
      return super.parseValidSubTag(subTagStr, subTagName, options)
    }
    const emptyInstance = new __Empty__(subTagStr, subTagName, {
      ...options,
    })
    return [emptyInstance.exec(), emptyInstance]
  }

  parseOnlyString(
    subTagStr: string,
    subTagName: TagName,
    options: ParseOptions
  ): [string, any] {
    if (this.tagName === '__skip__') {
      return super.parseOnlyString(subTagStr, subTagName, options)
    }
    return [subTagStr, null]
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

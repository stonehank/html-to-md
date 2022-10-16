import Tag from '../Tag'
import SelfCloseTag from '../SelfCloseTag'
/*
 *
 * <sub><b>abc</b></sub>
 * ==> <sub>**abc**</sub>
 *
 * */

class __NoMatch__ extends Tag {
  constructor(str: string, tagName = '__nomatch__') {
    super(str, tagName)
  }

  beforeMergeSpace(content: string) {
    return `<${this.tagName}>${content}</${this.tagName}>`
  }

  exec() {
    return super.exec('', '')
  }
}

class __NoMatchSelfClose__ extends SelfCloseTag {
  constructor(str: string, tagName = '__nomatchselfclose__') {
    super(str, tagName)
  }

  exec() {
    return `<${this.tagName} />`
  }
}

export { __NoMatch__, __NoMatchSelfClose__ }

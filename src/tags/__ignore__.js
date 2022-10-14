/*
 *
 * <div><b>abc</b></div>
 * ==> ''
 *
 * */

class __Ignore__ {
  constructor(str, tagName = '__ignore__', { parentTag = '' } = {}) {
    this.tagName = tagName
    this.parentTag = parentTag
  }

  exec() {
    return ''
  }
}

export default __Ignore__

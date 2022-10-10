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

module.exports = __Ignore__

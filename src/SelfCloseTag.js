const { parseAttrs} = require('./utils')
const {TAB_SPACE} = require('./utils/CONSTANT')

class SelfCloseTag {
  constructor(str,tagName,{
    tabSpace = TAB_SPACE,
    parentTag = '',
    layer=1,
    isFirstTag=false
  }={}){
    this.tagName = tagName
    this.rawStr = str
    this.parentTag = parentTag
    this.isFirstTag = isFirstTag
    this.tabSpace = tabSpace
    this.layer = layer
    this.leadingSpace=this.tabSpace.repeat(this.layer-1)
    if (!this.__detectStr__(str, this.tagName)) {
      return
    }
    let {attr} = this.__fetchTagAttr__(str)
    this.attrs = attr
  }

  /**
   * Detect is a valid tag string
   * @param str
   * @param tagName
   * @returns {boolean}
   */
  __detectStr__(str, tagName) {
    if (str[0] !== "<") {
      console.error(`Not a valid tag, current tag name: ${this.tagName}, tag content: ${str}`)
      return false
    }
    let name = '', name_done = false
    for (let i = 1; i < str.length; i++) {
      if (str[i] === ">") break
      if (!name_done && /(\s|\/)/.test(str[i])) {
        name_done = true
      }
      if (!name_done) {
        name += str[i]
      }
    }
    if (name !== tagName) {
      console.warn("Tag is not match tagName, tagName in str is " + name + ', which tagName passed from parent is ' + tagName)
      return false
    }
    return true
  }

  /**
   *
   * @param str
   * @returns {{attr: {}, content: *}}
   */
  __fetchTagAttr__(str) {
    let openTagAttrs = '', i = 1
    for (; i < str.length; i++) {
      if (str[i] === ">") break
      openTagAttrs += str[i]
    }
    return {
      attr: parseAttrs(openTagAttrs),
    }
  }

  // 在步骤开始前，一般只需返回空字符串
  beforeParse() {
    return ''
  }


  // 在合并必要的空行前
  beforeMergeSpace(str) {
    return str
  }

  // 合并必要的空行后
  afterMergeSpace(str) {
    return str
  }

  // 最终返回前
  beforeReturn(str) {
    return str
  }

  exec(prevGap = '', endGap = '') {
    let content = this.beforeParse()
    content = this.beforeMergeSpace(content)
    content = prevGap + content + endGap
    content = this.afterMergeSpace(content)
    content = this.beforeReturn(content)
    return content
  }
}



module.exports=SelfCloseTag

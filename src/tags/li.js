const Tag =require('../Tag')
const {findTagClass}=require('../utils')
const {CODE_INDENT_SPACE} = require('../utils/CONSTANT')

class Li extends Tag{
  constructor(str,tagName='li',{match='*'+' '.repeat(CODE_INDENT_SPACE.length-1),layer=1}={}){
    super(str,tagName)
    this.match=match
    this.layer=layer
    this.leadingSpace=this.tabSpace.repeat(this.layer-1)
    this._isFirstSubTag=true
    this.extraGap=false
  }

  beforeMergeSpace(content){
    let extraGap=''

    if(this.extraGap){
      extraGap='\n'
    }
    return extraGap+this.leadingSpace+this.match + content
  }

  parseValidSubTag(subTagStr, subTagName) {
    let extraGap=subTagName==='p'
    // 在li内部 需要另起一行，并且内部可以嵌套
    let isOneGap=subTagName==='ul'
        || subTagName==='ol'
        || subTagName==='blockquote'
        || subTagName==='pre'
    let SubTagClass=findTagClass(subTagName)
    let subTag=new SubTagClass(subTagStr,subTagName,
        {
          layer:this.layer+1,
          parentTag:this.tagName,
          isFirstTag:this._isFirstSubTag
        })
    // let prevGap='', endGap=''
    // if(!this._isFirstSubTag){
    //   if(extraGap){
    //     prevGap='\n'
    //   } else if(isOneGap){
    //     prevGap='\n'
    //   }
    // }
    this._isFirstSubTag=false
    // if(extraGap){
    //   endGap='\n'
    // }else if(isOneGap){
    //   endGap='\n'
    // }
    this.extraGap=this.extraGap || extraGap
    // console.log(subTag.exec(prevGap,endGap))
    return subTag.exec()
  }

  parseOnlyString(subTagStr, subTagName, options) {
    options.leadingSpace=this.leadingSpace
    if(subTagStr.trim()!=='')this._isFirstSubTag=false
    return super.parseOnlyString(subTagStr, subTagName, options);
  }

  afterParsed(content) {
    // console.log(content)
    return super.afterParsed(content);
  }

  beforeReturn(content) {
    return super.beforeReturn(content);
  }

  // slim(content) {
  //   return this._isFirstSubTag ? content.replace(/^\s?\n+/,'').trimRight() : content.trim()
  // }

  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}


module.exports=Li


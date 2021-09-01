const Tag =require('../Tag')
const {__Empty__,__EmptySelfClose__} =require('../tags/__Empty__')
const {findTagClass,isSelfClosing,unescape}=require('../utils')

class Code extends Tag{
  constructor(str,tagName='code',{match='`',language=''}={}){
    super(str,tagName)
    this.match=match
    this.language=language
  }

  beforeMergeSpace(content){
    let startMatch, endMatch
    // 不是在pre内部，也不是多个`
    if(this.match!=='' && this.match!=='`'){
      startMatch= this.match+' '
      endMatch=' '+this.match
    }else{
      startMatch=this.match
      endMatch=this.match
    }
    return startMatch + content + endMatch
  }

  parseValidSubTag(subTagStr, subTagName) {
    if(subTagName==="pre"){
      let SubTagClass=findTagClass(subTagName)
      let subTag=new SubTagClass(subTagStr,subTagName,{language:this.language,match:''})
      return subTag.exec('','')
    }else{
      let SubTagClass=findTagClass(subTagName)
      let subTag=new SubTagClass(subTagStr,subTagName,{parentTag:'code',strKeepFormat:true})
      return subTag.exec('','')
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    if(this.match!=='' && subTagStr!=null){
      let count=1
      if(subTagStr.startsWith('`') || subTagStr.endsWith('`')){
        count=2
        if(subTagStr.startsWith('``') || subTagStr.endsWith('``')){
          count=3
        }
      }
      this.match='`'.repeat(count)
    }
    return unescape(subTagStr)
  }

  slim(content) {
    return content;
  }

  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap);
  }

}


module.exports=Code

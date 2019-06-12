const Tag =require('../Tag')
const {findValidTag,findTagClass,unescape}=require('../utils')


class Code extends Tag{
  constructor(str,tagName='code',{match='`',language=''}={}){
    super(str,tagName)
    this.match=match
    this.language=language
  }


  beforeMerge(){
    return this.match
  }

  afterMerge(){
    return this.match
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="span"  && this.language!==''){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else if(tagName==="pre"){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{language:this.language,match:''})
        res+=subTag.execMerge('','')
      }else{
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Code

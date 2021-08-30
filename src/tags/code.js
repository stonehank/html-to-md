const Tag =require('../Tag')
const {findValidTag,findTagClass,unescape}=require('../utils')


class Code extends Tag{
  constructor(str,tagName='code',{match='`',language=''}={}){
    super(str,tagName)
    this.match=match
    this.language=language
  }

  beforeReturn(str){
    return str
  }

  beforeMerge(){
    if(this.match!=='' && this.match!=='`'){
      return this.match+' '
    }
    return this.match
  }

  afterMerge(){
    if(this.match!=='' && this.match!=='`'){
      return ' '+this.match
    }
    return this.match
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    // console.log(tagName,tagStr)
    while(tagStr!==''){
      // if(tagName==="span"  && this.language!==''){
      //   let SubTagClass=findTagClass(tagName)
      //   let subTag=new SubTagClass(tagStr,tagName)
      //   res+=subTag.execMerge('','')
      // }else
      if(tagName==="pre"){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{language:this.language,match:''})
        res+=subTag.execMerge('','')
      }else if(!!tagName){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else{
        if(this.match!=='' && tagStr!=null){
          let count=1
          if(tagStr.startsWith('`') || tagStr.endsWith('`')){
            count=2
            if(tagStr.startsWith('``') || tagStr.endsWith('``')){
              count=3
            }
          }
          this.match='`'.repeat(count)
        }
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }

    return res
  }

  execMerge(gapBefore='',gapAfter=''){
    let str=''+gapBefore
    let content=this.handleContent()
    str+=this.beforeMerge()
    str+=this.slimContent(content)
    str+=this.afterMerge()
    str+=gapAfter
    return this.afterSlim(str)
  }

}


module.exports=Code

const Tag =require('../Tag')
const {findValidTag,findTagClass,unescape}=require('../utils')


 class P extends Tag{
  constructor(str,tagName='p',{layer=1,isFirstTag=false}={}){
    super(str,tagName)
    this.layer=layer
    this.leadingSpace=isFirstTag ? '' : this.tabSpace.repeat(this.layer-1)
  }

  beforeMerge(){
    return this.leadingSpace
  }

  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge()
      }else{
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    // console.log('~~~'+gapBefore+'----'+gapAfter+'====')
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=P

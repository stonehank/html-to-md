const Tag =require('../Tag')
const {findValidTag,findTagClass,unescape}=require('../utils')

class A extends Tag{
  constructor(str,tagName='a'){
    super(str,tagName)
    this.handleContent=this.handleContent.bind(this,'','')
  }

  beforeMerge(){
    return `[`
  }

  afterMerge(){
    let {href}=this.getAttrs()
    if(!href)href=''
    return `](${href})`
  }

  handleContent(subBeforeGap,subAfterGap,ignoreNoTags=false){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{parentTag:this.parentTag})
        res+=subTag.execMerge(subBeforeGap,subAfterGap)
      }else if(!ignoreNoTags){
        res+=unescape(tagStr,{needEscape:this.needEscape}).trim()
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

module.exports=A

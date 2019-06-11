const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class A extends Tag{
  constructor(str,tagName='a'){
    super(str,tagName)
  }

  beforeMerge(){
    return `[`
  }

  afterMerge(){
    let {href}=this.getAttrs()
    if(!href)href=''
    return `](${href})`
  }

  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else{
        res+=tagStr
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

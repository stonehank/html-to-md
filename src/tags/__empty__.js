const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class __Empty__ extends Tag{
  constructor(str,tagName='__empty__'){
    super(str,tagName)
    this.tagName=tagName
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let subTag=new __Empty__(tagStr,tagName)
        res+=subTag.execMerge()
      }else{
        res+=tagStr
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(){
    return super.execMerge('','')
  }

}


module.exports=__Empty__



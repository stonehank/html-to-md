const Tag =require('../Tag')
const __Ignore__=require('./__ignore__')
const {findValidTag,findTagClass}=require('../utils')
const {aliasTags}=require('../config').get()


class Tr extends Tag{
  constructor(str,tagName='tr'){
    super(str,tagName)
  }

  beforeMerge(){
    return '|'
  }


  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!==null){
        let SubTagClass=findTagClass(tagName)
        if(tagName!=='td' && tagName!=='th' && aliasTags[tagName]!=='td' && aliasTags[tagName]!=='th' && SubTagClass !== __Ignore__ ){
          throw new Error('Should not have tags except <td> or <th> inside <tr>, current tag is '+tagName)
        }
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Tr




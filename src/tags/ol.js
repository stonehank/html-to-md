const Tag =require('../Tag')
const __Ignore__=require('./__ignore__')
const {findValidTag,findTagClass}=require('../utils')
const {aliasTags}=require('../config').get()

class Ol extends Tag{
  constructor(str,tagName='ol',{layer=1}={}){
    super(str,tagName)
    let attrs=this.getAttrs()
    this.layer=layer
    this.count=attrs.start || 1
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagStr.trim()!==''){
        if(tagName!=null){
          let SubTagClass=findTagClass(tagName)
          if(tagName!=='li' && aliasTags[tagName]!=='li' && SubTagClass !== __Ignore__){
            throw new Error('Should not have tags except <li> inside ol, current tag is '+tagName+', current tagStr is'+tagStr )
          }
          let subTag=new SubTagClass(tagStr,tagName,{match:this.count+'.',layer:this.layer})
          res+=subTag.execMerge('','\n')
        }
        this.count++
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='\n',gapAfter=''){
    if(this.layer>1){
      gapBefore=''
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Ol


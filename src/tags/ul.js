const Tag =require('../Tag')
const __Ignore__=require('./__ignore__')
const {findValidTag,findTagClass,shouldRenderRawInside}=require('../utils')
const {aliasTags}=require('../config').get()

class Ul extends Tag{
  constructor(str,tagName='ul',{layer=1,parentTag=''}={}){
    super(str,tagName)
    this.layer=layer
    this.parentTag=parentTag
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
            console.error('Should not have tags except <li> inside ul, current tag is '+tagName+', current tagStr is'+tagStr )
          }else{
            let subTag=new SubTagClass(tagStr,tagName,{match:'* ',layer:this.layer})
            res+=subTag.execMerge('','\n')
          }
        }
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='\n',gapAfter=''){
    if(shouldRenderRawInside.includes(this.parentTag)){
      return this.rawStr.replace(/([\n\r])/g,'')
    }
    if(this.layer>1){
      gapBefore=''
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Ul

const Tag =require('../Tag')
const __Ignore__=require('./__ignore__')
const {findTagClass}=require('../utils')
const {aliasTags}=require('../config').get()

class Ul extends Tag{
  constructor(str,tagName='ul',{layer=1,parentTag=''}={}){
    super(str,tagName)
    this.layer=layer
    this.parentTag=parentTag
  }


  parseValidSubTag(subTagStr, subTagName) {
    let SubTagClass=findTagClass(subTagName)
    if(subTagName!=='li' && aliasTags[subTagName]!=='li' && SubTagClass !== __Ignore__){
      console.error('Should not have tags except <li> inside ul, current tag is '+subTagName+', current tagStr is'+subTagStr )
      return ''
    }else{
      let subTag=new SubTagClass(subTagStr,subTagName,{layer:this.layer})
      return subTag.exec('','\n')
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  slim(content) {
    if(this.layer>1){
      return content
    }
    return content.trim()
  }

  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}


module.exports=Ul

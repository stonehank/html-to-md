const Tag =require('../Tag')
const __Ignore__=require('./__ignore__')
const {findTagClass}=require('../utils')
const {aliasTags}=require('../config').get()

class Ol extends Tag{
  constructor(str,tagName='ol',{layer=1,parentTag=''}={}){
    super(str,tagName)
    this.layer=layer
    this.parentTag=parentTag
    this.count=this.attrs.start || 1
  }

  parseValidSubTag(subTagStr, subTagName) {
    let SubTagClass=findTagClass(subTagName)
    if(subTagName!=='li' && aliasTags[subTagName]!=='li' && SubTagClass !== __Ignore__){
      console.error('Should not have tags except <li> inside ol, current tag is '+subTagName+', current tagStr is'+subTagStr )
      return ''
    }else{
      let subTag=new SubTagClass(subTagStr,subTagName,{
        match:this.count+'.  ',
        layer:this.layer
      })
      this.count++
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


module.exports=Ol


const Tag =require('../Tag')
const __Ignore__=require('./__ignore__')
const {findTagClass}=require('../utils')
const {aliasTags}=require('../config').get()


class Tr extends Tag{
  constructor(str,tagName='tr',options){
    super(str,tagName,options)
  }

  beforeMergeSpace(content){
    return '|' + content
  }

  parseValidSubTag(subTagStr, subTagName) {
    let SubTagClass=findTagClass(subTagName)
    if(subTagName!=='td' && subTagName!=='th' && aliasTags[subTagName]!=='td' && aliasTags[subTagName]!=='th' && SubTagClass !== __Ignore__ ){
      console.error(`Should not have tags except <td> or <th> inside <tr>, current tag is ${subTagName} have been ignore.`)
      return ''
    }else{
      let subTag=new SubTagClass(subTagStr,subTagName)
      return subTag.exec('','')
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }
  exec(prevGap='',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Tr




const Tag =require('../Tag')


class Th extends Tag{
  constructor(str,tagName='th',options){
    super(str,tagName,options)
    this.tagName=tagName
  }


  beforeMergeSpace(content){
    return content + '|'
  }

  parseValidSubTag(subTagStr, subTagName) {
    if(subTagName==='ul' || subTagName==='ol' || subTagName==='table' || subTagName==='pre'){
      return subTagStr.replace(/([\n\r])/g,'')
    }
    return super.parseValidSubTag(subTagStr, subTagName)
  }

  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Th




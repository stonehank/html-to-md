const Th =require('./th')



class Td extends Th{
  constructor(str,tagName='td',options){
    super(str,tagName,options)
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
module.exports=Td




const Th =require('./th')



class Td extends Th{
  constructor(str,tagName='td'){
    super(str,tagName)
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Td




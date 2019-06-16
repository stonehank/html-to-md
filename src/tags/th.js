const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')



class Th extends Tag{
  constructor(str,tagName='th'){
    super(str,tagName)
    this.handleContent=this.handleContent.bind(this,'','')
  }


  afterMerge(){
    return '|'
  }


  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Th




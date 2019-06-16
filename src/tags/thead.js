const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')



class Thead extends Tag{
  constructor(str,tagName='thead'){
    super(str,tagName)
    this.handleContent=this.handleContent.bind(this,'','',true)
  }


  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Thead




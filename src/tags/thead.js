const Tag =require('../Tag')



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




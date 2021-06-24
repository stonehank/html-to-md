const Tag =require('../Tag')

class Strong extends Tag{
  constructor(str,tagName='strong'){
    super(str,tagName)
    this.needEscape=true
    this.handleContent=this.handleContent.bind(this,'','')
  }

  beforeMerge(){
    return "**"
  }

  afterMerge(){
    return "**"
  }


  slimContent(str){
    return str.replace(/^(\n\s*)+/,'').replace(/(\n\s*)+$/,'')
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Strong

const Tag =require('../Tag')

class Em extends Tag{
  constructor(str,tagName='em'){
    super(str,tagName)
    this.needEscape=true
    this.handleContent=this.handleContent.bind(this,'','')
  }

  beforeMerge(){
    return "*"
  }

  afterMerge(){
    return '*'
  }
  slimContent(str){
    return str.trim()
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Em

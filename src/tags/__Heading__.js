const Tag =require('../Tag')

class __Heading__ extends Tag{
  constructor(str,tagName='1'){
    super(str,tagName)
    this.handleContent=this.handleContent.bind(this,'','')
  }

  beforeMerge(){
    return '# '
  }


  execMerge(gapBefore='\n',gapAfter='\n'){
    if(!gapAfter)gapAfter='\n'
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=__Heading__

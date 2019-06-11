const HEAD =require('../HEAD')



class H4 extends HEAD{
  constructor(str,tagName='h4'){
    super(str,tagName)
  }

  beforeMerge(){
    return "#### "
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H4


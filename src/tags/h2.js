const HEAD =require('../HEAD')



class H2 extends HEAD{
  constructor(str,tagName='h2'){
    super(str,tagName)
  }

  beforeMerge(){
    return "## "
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H2

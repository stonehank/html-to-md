const HEAD =require('../HEAD')



class H1 extends HEAD{
  constructor(str,tagName='h1'){
    super(str,tagName)
  }

  beforeMerge(){
    return "# "
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H1


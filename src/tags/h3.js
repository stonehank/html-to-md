const HEAD =require('../HEAD')



class H3 extends HEAD{
  constructor(str,tagName='h3'){
    super(str,tagName)
  }

  beforeMerge(){
    return "### "
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H3


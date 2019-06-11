const HEAD =require('../HEAD')



class H5 extends HEAD{
  constructor(str,tagName='h5'){
    super(str,tagName)
  }

  beforeMerge(){
    return "##### "
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H5

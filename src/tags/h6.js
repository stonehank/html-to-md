const HEAD =require('../HEAD')



class H6 extends HEAD{
  constructor(str,tagName='h6'){
    super(str,tagName)
  }

  beforeMerge(){
    return "###### "
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H6

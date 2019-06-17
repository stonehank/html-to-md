const __Heading__ =require('./__Heading__')



class H4 extends __Heading__{
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


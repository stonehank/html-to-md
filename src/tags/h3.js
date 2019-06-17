const __Heading__ =require('./__Heading__')



class H3 extends __Heading__{
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


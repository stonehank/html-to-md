const SelfCloseTag =require('../SelfCloseTag')

class Hr extends SelfCloseTag{
  constructor(str,tagName='hr'){
    super(str,tagName)
  }

  beforeMerge(){
    return "---"
  }

  handleContent(){
    return ''
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Hr

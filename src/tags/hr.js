const SelfCloseTag =require('../SelfCloseTag')

class Hr extends SelfCloseTag{
  constructor(str,tagName='hr',{layer=1,isFirstTag=false}={}){
    super(str,tagName)
    this.layer=layer
    this.isFirstTag=isFirstTag
  }

  beforeMerge(){
    return "---"
  }

  beforeReturn(str){
    if(this.layer>1 || this.isFirstTag){
      return str
    }
    str.replace(/^(\n\s*)+/,'\n\n')
      .replace(/(\n\s*)+$/,'\n\n')
    return str
  }

  handleContent(){
    return ''
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    if(this.layer>1 || this.isFirstTag){
      gapAfter='\n'
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Hr

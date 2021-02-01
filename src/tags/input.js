const SelfCloseTag =require('../SelfCloseTag')

class Img extends SelfCloseTag{
  constructor(str,tagName='input',{parentTag=null}={}){
    super(str,tagName)
    this.attrs=this.getAttrs()
    this.parentTag=parentTag
    this.str=str
  }



  beforeMerge(){
    if(this.parentTag!=="li")return this.str
    // if(this.parentTag!=="li")beforeStr='* '
    let {disabled,type,checked}=this.attrs

    if(type==="checkbox" ){
      return checked!=null ? '[x] ' : '[ ] '
    }
    return this.str
  }
  beforeReturn(str){
    // if(this.parentTag!=="li")return str+'\n'
    return str
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Img


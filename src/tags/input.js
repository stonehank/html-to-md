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
    let {disabled,type,checked}=this.attrs
    if(type==="checkbox" && disabled!=null ){
      return checked!=null ? '[x] ' : '[ ] '
    }
    return this.str
  }


  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Img


const SelfCloseTag =require('../SelfCloseTag')

class Img extends SelfCloseTag{
  constructor(str,tagName='img'){
    super(str,tagName)
  }



  beforeMerge(){
    return `![`
  }

  afterMerge(){
    let {src,alt}=this.getAttrs()
    if(!alt)alt=''
    if(!src)src=''
    return `${alt}](${src})`
  }


  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Img


const SelfCloseTag =require('../SelfCloseTag')

class Img extends SelfCloseTag{
  constructor(str,tagName='img'){
    super(str,tagName)
  }


  beforeMergeSpace(){
    let {src,alt}=this.attrs
    if(!alt)alt=''
    if(!src)src=''
    return `![${alt}](${src})`
  }


  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Img


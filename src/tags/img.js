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
    return `${alt}](${src})`
  }


  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Img



let img=new Img("<img src=\"https://octodex.github.com/images/minion.png\" alt=\"Minion\">")

console.log(img.execMerge())
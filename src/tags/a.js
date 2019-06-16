const Tag =require('../Tag')


class A extends Tag{
  constructor(str,tagName='a'){
    super(str,tagName)
    this.handleContent=this.handleContent.bind(this,'','')
  }

  beforeMerge(){
    return `[`
  }

  afterMerge(){
    let {href}=this.getAttrs()
    if(!href)href=''
    return `](${href})`
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}

module.exports=A

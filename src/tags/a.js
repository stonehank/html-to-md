const Tag =require('../Tag')

class A extends Tag{
  constructor(str,tagName='a'){
    super(str,tagName)
  }

  beforeMergeSpace(content){
    let {href}=this.attrs
    if(!href){
      href=''
    }
    return `[${content}](${href})`
  }

  parseOnlyString(subTagStr, subTagName,options){
    if(this.parentTag==='tbody' || this.parentTag==='thead'){
      return subTagStr
    }
    return super.parseOnlyString(subTagStr, subTagName,options);
  }


  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}

module.exports=A

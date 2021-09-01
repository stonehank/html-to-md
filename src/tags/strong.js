const Tag =require('../Tag')

class Strong extends Tag{
  constructor(str,tagName='strong'){
    super(str,tagName)
  }

  beforeMergeSpace(content){
    return "**" + content + "**"
  }


  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}


module.exports=Strong

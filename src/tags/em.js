const Tag =require('../Tag')

class Em extends Tag{
  constructor(str,tagName='em'){
    super(str,tagName)
  }

  beforeMergeSpace(content){
    return "*" + content + '*'
  }


  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}


module.exports=Em

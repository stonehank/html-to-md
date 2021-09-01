const Tag =require('../Tag')



class Thead extends Tag{
  constructor(str,tagName='thead'){
    super(str,tagName)
  }


  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Thead




const Tag =require('../Tag')


class Br extends Tag{
  constructor(str,tagName='b',options){
    super(str,tagName,options)
  }

  exec(prevGap,endGap){
    return '  \n'
  }

}


module.exports=Br


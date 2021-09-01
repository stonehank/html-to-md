const Tag =require('../Tag')


class Span extends Tag{
  constructor(str,tagName='span',options){
    super(str,tagName,options)
  }



  exec(prevGap = '', endGap = '') {
    return super.exec(prevGap, endGap);
  }
}


module.exports=Span

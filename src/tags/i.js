const Em =require('./em')

class I extends Em{
  constructor(str,tagName='i',options){
    super(str,tagName,options)
  }

  exec(prevGap,endGap){
    return super.exec(prevGap,endGap)
  }

}

module.exports=I

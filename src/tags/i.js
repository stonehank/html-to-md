const Em =require('./em')

class I extends Em{
  constructor(str,tagName='i'){
    super(str,tagName)
  }

  exec(prevGap,endGap){
    return super.exec(prevGap,endGap)
  }

}

module.exports=I

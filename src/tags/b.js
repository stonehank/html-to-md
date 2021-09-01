const Strong =require('./strong')


class B extends Strong{
  constructor(str,tagName='b'){
    super(str,tagName)
  }

  exec(prevGap,endGap){
    return super.exec(prevGap,endGap)
  }

}


module.exports=B


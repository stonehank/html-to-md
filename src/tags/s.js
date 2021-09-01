const Del =require('./del')


class S extends Del{
  constructor(str,tagName='s'){
    super(str,tagName)
  }

  exec(prevGap,endGap){
    return super.exec(prevGap,endGap)
  }

}


module.exports=S


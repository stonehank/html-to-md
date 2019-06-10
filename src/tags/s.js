const Del =require('./del')


class S extends Del{
  constructor(str,tagName='s'){
    super(str,tagName)
  }

  execMerge(gapBefore,gapAfter){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=S


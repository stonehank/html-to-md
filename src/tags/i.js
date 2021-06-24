const Em =require('./em')

class I extends Em{
  constructor(str,tagName='i'){
    super(str,tagName)
  }

  execMerge(gapBefore,gapAfter){
    return super.execMerge(gapBefore,gapAfter)
  }

}

module.exports=I

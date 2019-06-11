const Strong =require('./Strong')


class B extends Strong{
  constructor(str,tagName='b'){
    super(str,tagName)
  }

  execMerge(gapBefore,gapAfter){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=B


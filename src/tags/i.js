const Em =require('./Em')
const {unescape}=require( '../escape')

class I extends Em{
  constructor(str,tagName='i'){
    super(str,tagName)
  }


  execMerge(gapBefore,gapAfter){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=I


//
// let i=new I('<i>dsafsf<button>sfds</button>123</i>')
//
// console.log(i.execMerge())
const SelfCloseTag =require('../SelfCloseTag')

class Hr extends SelfCloseTag{
  constructor(str,tagName='hr'){
    super(str,tagName)
  }

  beforeMerge(){
    return "---"
  }

  handleContent(){
    return ''
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Hr



let hr=new Hr('<hr /><h1>dsafsf<button>sfds</button>123</h1>')

console.log(hr.execMerge())
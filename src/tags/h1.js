const Tag =require('../Tag')
const {unescape}=require( '../escape')

class H1 extends Tag{
  constructor(str,tagName='h1'){
    super(str,tagName)
  }

  beforeMerge(){
    return "# "
  }

  handleContent(){
    let content=this.getContent()
    content=unescape(content)
    return content
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=H1



let h1=new H1('<h1>dsafsf<button>sfds</button>123</h1>')

console.log(h1.execMerge())
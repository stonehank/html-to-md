const Tag =require('../Tag')
const {unescape}=require( '../escape')

 class P extends Tag{
  constructor(str,tagName='p'){
    super(str,tagName)
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


module.exports=P

//
// let p=new P('<p>dsafsf<button>sfds</button>123</p>')
//
// console.log(p.execMerge())
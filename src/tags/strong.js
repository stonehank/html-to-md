const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Strong extends Tag{
  constructor(str,tagName='strong'){
    super(str,tagName)
  }

  beforeMerge(){
    return "**"
  }

  afterMerge(){
    return '**'
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else{
        res+=tagStr
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Strong



// let strong=new Strong('<strong><a href="https://github.com/nodeca/babelfish/"><i>babelfish</i></a></strong>')
// //
// console.log(strong.execMerge())
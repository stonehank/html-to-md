const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')

class Strong extends Tag{
  constructor(str,tagName='strong',{parentTag}={}){
    super(str,tagName)
    this.parentTag=parentTag
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

  execMerge(gapBefore=' ',gapAfter=''){
    // if(this.parentTag==='i' || this.parentTag==='em'){
    //   gapBefore=''
    // }
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Strong



let strong=new Strong('<strong>dsafsf<i>sfds</i>123</strong>')
//
console.log(strong.execMerge())
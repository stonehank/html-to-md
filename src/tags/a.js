const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')

class A extends Tag{
  constructor(str,tagName='a'){
    super(str,tagName)
  }



  beforeMerge(){
    return `[`
  }

  afterMerge(){
    let {href}=this.getAttrs()
    return `](${href})`
  }

  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
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
module.exports=A



let a=new A("<a href=\"https://nodeca.github.io/pica/demo/\"><strong>pica</strong></a>")

console.log(a.execMerge())
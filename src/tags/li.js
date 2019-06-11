const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Li extends Tag{
  constructor(str,tagName='li',{match='*',layer=1}={}){
    super(str,tagName)
    this.match=match
    this.layer=layer
  }

  beforeMerge(){
    return ' '.repeat((this.layer-1)*4)+this.match+' '
  }

  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        // 在li内部 需要另起一行，并且内部可以嵌套
        let isSubList=tagName==='ul' || tagName==='ol' || tagName==='blockquote' || tagName==='pre'
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{layer:this.layer + (isSubList ? 1 : 0)})
        if(isSubList && !res.endsWith('\n')){
          res+='\n'
        }
        res+=subTag.execMerge('','')
      }else{
        if(tagStr!=="\n")res+=tagStr
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Li


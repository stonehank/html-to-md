const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Li extends Tag{
  constructor(str,tagName='li',{match='*',layer=1}={}){
    super(str,tagName)
    this.match=match
    this.layer=layer
    this.lastTag=null
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
        this.lastTag=tagName
        // 在li内部 需要另起一行，并且内部可以嵌套
        let isSubList=tagName==='ul' || tagName==='ol' || tagName==='blockquote' || tagName==='pre'
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{layer:this.layer + (isSubList ? 1 : 0)})
        if(isSubList && !res.endsWith('\n')){
          res+='\n'
        }
        res+=subTag.execMerge('','')
      }else{
        if(tagStr.startsWith("\n"))tagStr=tagStr.slice(1,tagStr.length)
        if(tagStr.endsWith("\n"))tagStr=tagStr.slice(0,tagStr.length-1)
        res+=tagStr
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    // 由于Tag中最后会统一删除结尾的\n\n，因此这里需要增加\n\n
    if(this.lastTag==='p')res+='\n\n'
    // console.log(this.lastTag==='p')
    return res
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Li


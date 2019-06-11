const Tag =require('../Tag')
const {findValidTag,findTagClass,unescape}=require('../utils')


class Code extends Tag{
  constructor(str,tagName='code',{match='`',language='',layer=1}={}){
    super(str,tagName)
    this.match=match
    this.language=language
    this.layer=layer
    this.res=null
  }


  beforeMerge(){
    let preLayer=' '.repeat((this.layer-1)*4)
    if(this.match==='```')return preLayer+this.match+this.language+'\n'
    return preLayer+this.match
  }

  afterMerge(){
    let preLayer=' '.repeat((this.layer-1)*4)
    let gap=''
    if(this.match==='```' && !this.res.endsWith('\n'))gap='\n'
    return gap+preLayer+this.match
  }

  fillPerLine(lineStr){
    let preLayer=' '.repeat((this.layer-1)*4)
    return preLayer+lineStr
  }

  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="span" && this.language!==''){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else{
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    this.res=res
    let split=res.split('\n')
    split=split.map(n=>{
      if(n==='')return ''
      return this.fillPerLine(n)
    })
    return split.join('\n')
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Code

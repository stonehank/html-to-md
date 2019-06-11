const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Blockquote extends Tag{
  constructor(str,tagName='blockquote',{matchCounts=1,layer=1}={}){
    super(str,tagName)
    this.matchCounts=matchCounts
    this.layer=layer
    this.fillPerLine=this.fillPerLine.bind(this)
  }


  fillPerLine(lineStr){
    let preLayer=' '.repeat((this.layer-1)*4)
    if(!lineStr.startsWith('>') &&  this.matchCounts)return preLayer+'>'.repeat(this.matchCounts)+lineStr
    return preLayer+lineStr
  }


  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let isSubblockq=tagName==='blockquote'
        let subTag=new SubTagClass(tagStr,tagName,isSubblockq ? {matchCounts:this.matchCounts+1} : {})
        res+=subTag.execMerge('','\n')
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    let split=res.split('\n')
    split=split.map(n=>{
      if(n==='')return ''
      return this.fillPerLine(n)
    })
    return split.join('\n')
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    if(this.layer>1){
      gapBefore=''
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Blockquote



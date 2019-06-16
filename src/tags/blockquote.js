const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Blockquote extends Tag{
  constructor(str,tagName='blockquote',{matchCounts=1,layer=1}={}){
    super(str,tagName)
    this.matchCounts=matchCounts
    this.layer=layer
    this.leadingSpace=this.tabSpace.repeat(this.layer-1)
    this.match='>'.repeat(this.matchCounts)
    this.fillPerLine=this.fillPerLine.bind(this)
  }


  fillPerLine(lineStr){
    // let preLayer=' '.repeat((this.layer-1)*4)
    if(!lineStr.startsWith('>') &&  this.matchCounts)
      return this.leadingSpace+this.match+lineStr
    return this.leadingSpace+lineStr
  }


  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    let isFirstTag=true
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let isSubblockq=tagName==='blockquote'
        let subTag=new SubTagClass(tagStr,tagName,isSubblockq ? {matchCounts:this.matchCounts+1} : {})
        if(!isFirstTag){
          res+=(res.endsWith("\n") ? '' : '\n')+this.match+'\n'
        }
        res+=subTag.execMerge('','\n')
      }
      if(tagStr.trim()!=='')isFirstTag=false
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



const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Li extends Tag{
  constructor(str,tagName='li',{match='*',layer=1}={}){
    super(str,tagName)
    this.match=match
    this.layer=layer
    this.hasPTag=false
    this.leadingSpace=this.tabSpace.repeat(this.layer-1)
  }

  beforeMerge(){
    return this.leadingSpace+this.match+' '
  }

  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let isFirstTag=true
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      let tabSpace= isFirstTag ? '' : this.tabSpace
      if(tagName!=null){
        if(tagName==='p')this.hasPTag=true
        // 在li内部 需要另起一行，并且内部可以嵌套
        let isSubList=tagName==='ul' || tagName==='ol' || tagName==='blockquote' || tagName==='pre'
        let SubTagClass=findTagClass(tagName)
        let nxtLayer=this.layer+1
        let subTag=new SubTagClass(tagStr,tagName,{layer:nxtLayer,parentTag:'li',isFirstTag})
        let startGap=(tagName==='p' && !isFirstTag) ? '\n' : ''
        let endGap=isSubList ? '\n' : tagName==='p' ? '\n' : ''
        if((isSubList) && !isFirstTag && !res.endsWith('\n') ){
          res+='\n'
        }
        res+=subTag.execMerge(startGap,endGap)
      }else{
        tagStr=tagStr.replace(/(^\n|\n$)/g,'').replace(/^\s+|\s+$/g,' ')
        res+=res.endsWith('\n') ? tabSpace.repeat(this.layer) + tagStr : tagStr
      }
      if(tagStr.trim()!=='')isFirstTag=false
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  afterSlim(str){
    if(this.hasPTag && !str.endsWith('\n\n'))str+='\n'
    return str
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Li


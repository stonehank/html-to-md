const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

class Li extends Tag{
  constructor(str,tagName='li',{match='*',layer=1}={}){
    super(str,tagName)
    this.match=match
    this.layer=layer
    this.hasPTag=false
  }

  beforeMerge(){
    return ' '.repeat((this.layer-1)*4)+this.match+' '
  }

  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let isFirstTag=true
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      // console.log(tagName,tagStr)
      if(tagName!=null){
        if(tagName==='p')this.hasPTag=true
        // 在li内部 需要另起一行，并且内部可以嵌套
        let isSubList=tagName==='ul' || tagName==='ol' || tagName==='blockquote' || tagName==='pre'
        let SubTagClass=findTagClass(tagName)
        let nxtLayer=(isSubList && !isFirstTag) ? this.layer+1 : this.layer
        let extraSpace= isFirstTag ? '' : '  '
        // if(tagName==='p'){
        //   extraSpace=isFirstTag ? 0 : 2
        // }else if(isFirstTag){
        //   extraSpace=0
        // }
        let subTag=new SubTagClass(tagStr,tagName,{layer:nxtLayer,parentTag:'li',extraSpace})
        let startGap=(tagName==='p' && !isFirstTag) ? '\n' : ''
        let endGap=isSubList ? '\n' : tagName==='p' ? '\n\n\n' : ''
        if((isSubList || tagName==="p") && !isFirstTag && !res.endsWith('\n')){
          res+='\n'
        }
        res+=subTag.execMerge(startGap,endGap)
        
      }else{
        if(tagStr.startsWith("\n"))tagStr=tagStr.slice(1,tagStr.length)
        if(tagStr.endsWith("\n"))tagStr=tagStr.slice(0,tagStr.length-1)
        res+=tagStr
      }
      if(tagStr.trim()!=='')isFirstTag=false
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    //  清楚不必要的空格
    // res=res.trim()
    // 由于Tag中最后会统一删除结尾的\n\n，因此这里需要增加\n\n

    if(this.hasPTag && !res.endsWith('\n\n'))res+='\n\n'
      // console.log(res)
    // console.log(this.lastTag==='p')
    return res
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Li


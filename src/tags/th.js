const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')


class Th extends Tag{
  constructor(str,tagName='th'){
    super(str,tagName)
    this.curTagName=tagName
  }

  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{parentTag:this.curTagName})
        console.log(res,'|||',subTag.execMerge('',''))
        res+=subTag.execMerge('','')
      }else{
        tagStr=tagStr.replace(/^(\n)+/,'').replace(/\n+$/,'')
        res+=unescape(tagStr).replace(/^(\n*) +/,'$1 ')
        if(res.startsWith('\n')){
          res=res.trimLeft()
        }
        if(res.endsWith('\n')){
          res=res.trimRight()
        }
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  afterMerge(){
    return '|'
  }


  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Th




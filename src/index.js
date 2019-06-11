const {findTagClass,findValidTag}=require('../src/utils')

function html2Md(str){
  let getNxtValidTag=findValidTag(str)
  let res=''
  let [tagName,tagStr]=getNxtValidTag()
  while(tagStr!==''){
    if(tagName!=null){
      let SubTagClass=findTagClass(tagName)
      let subTag=new SubTagClass(tagStr,tagName)
      res+=subTag.execMerge()
    }else{
      res+=tagStr
    }
    let nxt=getNxtValidTag()
    tagName=nxt[0]
    tagStr=nxt[1]
  }
  return res
}

module.exports=html2Md
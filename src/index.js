const {findTagClass,findValidTag,unescape}=require('./utils')

function clearComment(str){
  return str.replace(/<!--(.|\n|\r|\t|\s)*?-->/g,'')
}


function html2md(str){
  str=clearComment(str)
  str=str.replace(/\s?\r\n/g,'')
  // console.log(str)
  let getNxtValidTag=findValidTag(str)
  let res=''
  let [tagName,tagStr]=getNxtValidTag()
  while(tagStr!==''){
    // console.log(tagStr,tagName)
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
  return beforeReturn(unescape(res))
}

function beforeReturn(str){
  str=str.replace(/&nbsp;/g,"").replace(/\n{3,}/g,"\n\n")
  if(str.endsWith("\n\n")){
    str=str.substring(0,str.length-1)
  }
  return str
}

module.exports=html2md
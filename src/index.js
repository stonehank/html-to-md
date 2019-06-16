const {findTagClass,findValidTag,unescape}=require('./utils')

function clearComment(str){
  return str.replace(/<!--(.|\n|\r|\t|\s)*?-->/g,'')
}



function html2md(str){
  str=clearComment(str)
  str=str.replace(/(\s*\r\n\s*)/g,'').replace(/&nbsp;/g,"")
  // console.log(str)
  let getNxtValidTag=findValidTag(str)
  let res=''
  let [tagName,tagStr]=getNxtValidTag()
  let lastTagName=null
  while(tagStr!==''){
    // console.log(tagStr,tagName)
    if(tagName!=null){
      lastTagName=tagName
      let SubTagClass=findTagClass(tagName)
      let subTag=new SubTagClass(tagStr,tagName)
      res+=subTag.execMerge()
    }else{
      res+=tagStr
      res=res.replace(/(\n\s*)+$/,'\n')
      // if(tagStr!=='\n')res+=tagStr
    }
    let nxt=getNxtValidTag()
    tagName=nxt[0]
    tagStr=nxt[1]
  }
  // console.log(unescape(res),lastTagName)
  return beforeReturn(unescape(res))
}

function beforeReturn(str){
  // if(tagName==='pre' || tagName==='code')return str
  // str=str.replace(/&nbsp;/g,"").replace(/\n{3,}/g,"\n\n")
  str=str.replace(/(\n\s*)+$/,'\n')
  // if(str.endsWith("\n\n")){
  //   str=str.substring(0,str.length-1)
  // }
  return str
}

module.exports=html2md
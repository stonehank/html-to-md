const {findTagClass,findValidTag,unescape,clearComment}=require('./utils')
const config =require('./config')

function html2md(str,options,force=false){
  config.set(options,force)
  str=clearComment(str)
  str=str.replace(/(\s*\r\n\s*)/g,'').replace(/&nbsp;/g,"")
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
      res=res.replace(/(\n\s*)+$/,'\n')
    }
    let nxt=getNxtValidTag()
    tagName=nxt[0]
    tagStr=nxt[1]
  }
  return beforeReturn(unescape(res))
}

function beforeReturn(str){
  str=str.replace(/(\n\s*)+$/,'\n')
  return str
}

module.exports=html2md

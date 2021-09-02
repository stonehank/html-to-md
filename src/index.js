// import {needIndependentLine} from "./utils";
const {findTagClass,findValidTag,unescape,clearComment}=require('./utils')
const config =require('./config')

function html2md(str,options,force=false){
  config.set(options,force)
  str=clearComment(str)
  str=str.trim()
  str=str.replace(/(\r\n)/g,'').replace(/&nbsp;/g,"")
  let getNxtValidTag=findValidTag(str)
  let res=''
  let [tagName,tagStr]=getNxtValidTag()
  // 还存在下一个tag，递归寻找
  while(tagStr!==''){
    if(tagName!=null){
      // 下一个tag是一个有效的并且不是纯文本
      let SubTagClass=findTagClass(tagName)
      let subTag=new SubTagClass(tagStr,tagName)
      let subContent=subTag.exec()

      // if(needIndependentLine(tagName) || needIndependentLine(config.get().aliasTags[tagName])){
      //   if(!res.endsWith('\n'))res+='\n'
      // }
      res+=subContent
    }else{
      // 下一个tag是一个无效的或者是纯文本
      // console.log(tagStr,tagName,'---------')
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
  // console.log('hhh'+str,'~~~~~')
  str=str.replace(/^\n+/,'')
  // console.log('hhh'+str)
  str=str.replace(/\s+$/,'')
  str=str.replace(/☈/g,' ')
  return str
}

// <b><i>123</b></i>
module.exports=html2md

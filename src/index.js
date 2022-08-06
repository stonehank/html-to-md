const {findTagClass,findValidTag,unescape,clearComment,needIndependentLine}=require('./utils')
const config =require('./config')

function html2md(str,options,force=false){
  config.reset()
  config.set(options,force)
  str=clearComment(str)
  str=str.trim()
  str=str.replace(/(\r\n)/g,'').replace(/&nbsp;/g," ")
  let getNxtValidTag=findValidTag(str)
  let res=''
  let prevTagName=null
  let [nextTagName,nextTagStr]=getNxtValidTag()
  // 还存在下一个tag，递归寻找
  while(nextTagStr!==''){
    if(nextTagName!=null){
      // 下一个tag是一个有效的并且不是纯文本
      let SubTagClass=findTagClass(nextTagName) 
      let options={
        parentTag:null,
        prevTagName:prevTagName,
        prevTagStr:res,
        // leadingSpace:this.leadingSpace,
        // layer:this.layer,
        // keepFormat:this.keepFormat,
      }
      let subTag=new SubTagClass(nextTagStr,nextTagName,options)
      let subContent=subTag.exec()
      let prevIsIndependent=needIndependentLine(prevTagName)
      let curIsIndependent=needIndependentLine(nextTagName)
      if(curIsIndependent && !prevIsIndependent && !res.endsWith('\n')){
        res+= '\n' + subContent
      }else{
        res+=subContent
      }
    }else{
      // 下一个tag是一个无效的或者是纯文本
      res+=nextTagStr
      res=res.replace(/(\n\s*)+$/,'\n')
    }
    prevTagName=nextTagName
    let nxt=getNxtValidTag()
    nextTagName=nxt[0]
    nextTagStr=nxt[1]
  }
  return beforeReturn(unescape(res))
}

function beforeReturn(str){
  str=str.replace(/^\n+/,'')
  str=str.replace(/\s+$/,'')
  str=str.replace(/☈/g,' ')
  return str
}

module.exports=html2md

const {extraEscape}=require('../utils')
const needIndependentLine=require('../utils/needIndependentLine')
const {TAB_SPACE} = require('../utils/CONSTANT')


class __RawString__{
  constructor(str,tagName='__nomatch__',{
    parentTag='',
    strKeepFormat=false,
    nextTagName='',
    prevTagName='',
    layer=1
  }={})
  {
    this.tagName=tagName
    this.nextTagName=nextTagName
    this.prevTagName=prevTagName
    this.parentTag=parentTag
    this.strKeepFormat=strKeepFormat
    this.layer=layer
    this.leadingSpace=TAB_SPACE.repeat(this.layer-1)
    this.rawStr=str
  }

  slim(str){
    if(this.strKeepFormat)return str
    // if(this.parentTag==='li' && needIndependentLine(this.prevTagName)){
    //   if(str.trim()==='')return ''
    //   return (this.leadingSpace ? this.leadingSpace : '') + TAB_SPACE+str.trim()
    // }
    let _str= str.replace(/\s+/g,' ')
    if(this.prevTagName && needIndependentLine(this.prevTagName)){
      _str=_str.trimLeft()
    }
    if(this.nextTagName && needIndependentLine(this.nextTagName)){
      _str=_str.trimRight()
    }
    return _str
  }

  beforeReturn(content){
    console.log(content,this.layer)
    if(this.strKeepFormat)return content
    // 一些需要嵌套的tag
    if(this.parentTag==='li'){
      return this.leadingSpace + extraEscape(content)
    }
    return extraEscape(content)
  }

  exec(){
    let content=this.rawStr
    content=this.slim(content)
    content=this.beforeReturn(content)
    return content
  }
}


module.exports=__RawString__



const Tag =require('../Tag')
const {__Empty__ ,__EmptySelfClose__}=require('./__empty__')
const {findTagClass,isSelfClosing,getLanguage}=require('../utils')
const {CODE_INDENT_SPACE} = require('../utils/CONSTANT')
class Pre extends Tag{
  constructor(str,tagName='pre',{layer=1,language=null,match='```',isFirstTag=false,parentTag=''}={}){
    super(str,tagName)
    let hasCodeSymbol=this.content.includes('```')
    this.layer=layer
    this.match=hasCodeSymbol ? '' : match
    this.isFirstTag=isFirstTag
    this.leadingSpace=this.tabSpace.repeat(this.layer-1)
    this.indentSpace=hasCodeSymbol ? CODE_INDENT_SPACE : ''
    this.existCodeTag=false
    this.parentTag=parentTag
    this.language = language!=null ? language : getLanguage(str)
  }


  beforeMergeSpace(content){
    let matchLang=this.match==='' ? '' : (this.match+this.language+'\n')
    let before=matchLang==='' ? '' : (this.isFirstTag ? matchLang : matchLang)
    let gap=''
    if(!content.endsWith('\n'))gap='\n'
    let after=this.match==='' ? gap : gap+this.indentSpace+this.match
    return before + content + after
  }


  fillPerLine(lineStr){
    // match==='' 说明是用间隔形成code标签
    if(this.isFirstTag && this.match===''){
      return this.indentSpace+lineStr
    }
    return this.leadingSpace+this.indentSpace+lineStr
  }


  afterMergeSpace(content) {
    console.log(content)
    let split = content.split('\n')
    split = split.map(n => {
      if (n === '') return ''
      return this.fillPerLine(n)
    })
    return split.join('\n')
  }

  parseValidSubTag(subTagStr, subTagName) {
    if(subTagName==='code'){
      this.existCodeTag=true
      let SubTagClass=findTagClass(subTagName)
      let subTag=new SubTagClass(subTagStr,subTagName,{match:'',language:this.language,parentTag:'pre'})
      return subTag.exec('','')
    } else{
      if(this.existCodeTag)return ''
      let emptyTag
      if(isSelfClosing(subTagName)){
        emptyTag=new __EmptySelfClose__(subTagStr,subTagName)
      } else {
        emptyTag = new __Empty__(subTagStr, subTagName,{parentTag:'pre',strKeepFormat:true})
      }
      return emptyTag.exec()
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return subTagStr
  }

  slim(content){
    return content
  }

  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}

module.exports=Pre

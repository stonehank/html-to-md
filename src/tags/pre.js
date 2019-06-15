const Tag =require('../Tag')
const {__Empty__ ,__EmptySelfClose__}=require('./__empty__')
const {findValidTag,findTagClass,unescape,isSelfClosing,getLanguage}=require('../utils')

class Pre extends Tag{
  constructor(str,tagName='pre',{layer=1,language=null,match='```',extraSpace=''}={}){
    super(str,tagName)
    this.content=this.getContent()
    let hasCodeSymbol=this.content.includes('```')
    this.layer=hasCodeSymbol ? layer+1 : layer
    this.match=hasCodeSymbol ? '' : match
    this.preLayer=extraSpace.repeat(layer-1)+' '.repeat((this.layer-1)*4)
    // console.log(this.layer)
    this.res=null
    this.language = language!=null ? language : getLanguage(str)
  }


  beforeMerge(){
    // let preLayer=' '.repeat((this.layer-1)*4)
    let matchLang=this.match==='' ? '' : (this.match+this.language+'\n')
    let before=matchLang==='' ? '' : this.preLayer+matchLang
    return before
  }

  afterMerge(){
    // let preLayer=' '.repeat((this.layer-1)*4)
    let gap=''
    if(!this.res.endsWith('\n'))gap='\n'
    let after=this.match==='' ? gap : gap+this.preLayer+this.match
    return after
  }

  fillPerLine(lineStr){
    // let preLayer=' '.repeat((this.layer-1)*4)
    return this.preLayer+lineStr
  }

  handleContent(){
    let getNxtValidTag=findValidTag(this.content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="code"){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{match:'',language:this.language})
        res+=subTag.execMerge('','')
      }else if(tagName!=null){
        let emptyTag
        if(isSelfClosing(tagName))emptyTag=new __EmptySelfClose__(tagStr,tagName)
        else emptyTag=new __Empty__(tagStr,tagName)
        res+=emptyTag.execMerge()
      }else{
        if(tagStr!=='\n') res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    this.res=res
    let split=res.split('\n')
    split=split.map(n=>{
      if(n==='')return ''
      return this.fillPerLine(n)
    })
    return split.join('\n')
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    if(this.layer>1){
      gapBefore=''
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}

module.exports=Pre

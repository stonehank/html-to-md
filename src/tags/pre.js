const Tag =require('../Tag')
const {__Empty__ ,__EmptySelfClose__}=require('./__empty__')
const {findValidTag,findTagClass,unescape,isSelfClosing,getLanguage,shouldRenderRawInside}=require('../utils')

class Pre extends Tag{
  constructor(str,tagName='pre',{layer=1,language=null,match='```',isFirstTag=false,parentTag=''}={}){
    super(str,tagName)
    this.content=this.getContent()
    let hasCodeSymbol=this.content.includes('```')
    this.layer=layer
    this.match=hasCodeSymbol ? '' : match
    this.isFirstTag=isFirstTag
    this.leadingSpace=this.tabSpace.repeat(this.layer-1)
    this.indentSpace=hasCodeSymbol ? '    ' : ''
    this.res=null
    this.existCodeTag=false
    this.parentTag=parentTag
    this.language = language!=null ? language : getLanguage(str)
  }


  beforeMerge(){
    let matchLang=this.match==='' ? '' : (this.match+this.language+'\n')
    let before=matchLang==='' ? '' : this.isFirstTag ? matchLang : this.leadingSpace+matchLang
    this.res+=before
    return before
  }

  afterMerge(){
    let gap=''
    if(!this.res.endsWith('\n'))gap='\n'
    let after=this.match==='' ? gap : gap+this.leadingSpace+this.indentSpace+this.match
    return after
  }

  fillPerLine(lineStr,id){
    // match==='' 说明是用间隔形成code标签
    if(this.isFirstTag && this.match==='' && id===0){
      return this.indentSpace+lineStr
    }
    return this.leadingSpace+this.indentSpace+lineStr
  }
  beforeReturn(str){
    return str
  }
  handleContent(){
    let getNxtValidTag=findValidTag(this.content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="code"){
        this.existCodeTag=true
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{match:'',language:this.language,parentTag:'pre'})
        let subTagRes=subTag.execMerge('','')

        // if(this.match!==''){
        //   let count=3
        //   if(subTagRes.startsWith('```') || subTagRes.endsWith('\n```')){
        //     count=4
        //     if(subTagRes.startsWith('````') || subTagRes.endsWith('\n````')){
        //       count=5
        //     }
        //   }
        //   this.match='`'.repeat(count)
        // }
        res+=subTagRes
      }else{
        if(this.existCodeTag){
          break
        }
        if(tagName!=null){
          let emptyTag
          if(isSelfClosing(tagName))emptyTag=new __EmptySelfClose__(tagStr,tagName)
          else emptyTag=new __Empty__(tagStr,tagName)
          res+=emptyTag.execMerge()
        }else{
          if(tagStr!=='\n') res+=unescape(tagStr)
        }
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }

    if(res===''){
      return res
    }
    let split=res.split('\n')
    split=split.map((n,i)=>{
      if(n==='')return ''
      return this.fillPerLine(n,i)
    })

    let ans=split.join('\n')
    this.res+=res
    return ans
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    if(shouldRenderRawInside.includes(this.parentTag)){
      return this.rawStr.replace(/[\n\r]/g,'')
    }
    if(this.layer>1){
      gapBefore=''
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}

module.exports=Pre

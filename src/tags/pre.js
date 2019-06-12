const Tag =require('../Tag')
const {__Empty__ ,__EmptySelfClose__}=require('./__empty__')
const {findValidTag,findTagClass,unescape,isSelfCloseTag,checkLang}=require('../utils')

class Pre extends Tag{
  constructor(str,tagName='pre',{layer=1,language=null,match='```'}={}){
    super(str,tagName)
    this.layer=layer
    this.match=match
    this.res=null
    this.content=this.getContent()
    // this.str=str
    this.language = language!=null ? language : this.getLanguage(str)

  }


  getLanguage(str){
    // let attrs=this.getAttrs()
    // let className=attrs['class']
    // if(className){
    //   let classArr=className.split(' ')
    //   for(let i=classArr.length-1;i>=0;i--){
    //     let temp='', name=classArr[i]
    //     for(let j=name.length-1;j>=0;j--){
    //       if(!/[a-zA-Z0-9+]/.test(name[j])){
    //         let standard=checkLang(temp)
    //         if(standard){
    //           return standard
    //         }
    //       }
    //       temp=name[j]+temp
    //     }
    //   }
    // }
    let matchLang=str.match(/(\bjava\b|\bjs\b|\bjavascript\b|\bpython\b|\bcpp\b|\bc\+\+\b|\bpy\b)/)
    if(matchLang)return matchLang[1]
    let match=str.match(/<span.*?hljs-(comment|keyword|number|string|literal|built_in|function|title).*?<\/span>/)
    return match ? 'javascript' : ''
  }

  beforeMerge(){
    let preLayer=' '.repeat((this.layer-1)*4)
    let matchLang=this.match==='' ? '' : this.match+this.language+'\n'
    return preLayer+matchLang
  }

  afterMerge(){
    let preLayer=' '.repeat((this.layer-1)*4)
    let gap=''
    if(!this.res.endsWith('\n'))gap='\n'
    return gap+preLayer+this.match
  }

  fillPerLine(lineStr){
    let preLayer=' '.repeat((this.layer-1)*4)
    return preLayer+lineStr
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
        if(isSelfCloseTag(tagName))emptyTag=new __EmptySelfClose__(tagStr,tagName)
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

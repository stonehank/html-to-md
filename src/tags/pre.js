const Tag =require('../Tag')
const __Empty__ =require('./__Empty__')
const {findValidTag,findTagClass,unescape,escape,checkLang}=require('../utils')

class Pre extends Tag{
  constructor(str,tagName='pre',{layer=1}={}){
    super(str,tagName)
    this.layer=layer
    this.res=null
    this.content=this.getContent()
    this.language = this.getLanguage()
  }


  getLanguage(){
    let attrs=this.getAttrs()
    let className=attrs['class']
    if(!className)return ''
    let classArr=className.split(' ')
    for(let i=classArr.length-1;i>=0;i--){
      let temp='', name=classArr[i]
      for(let j=name.length-1;j>=0;j--){
        if(!/[a-zA-Z0-9+]/.test(name[j])){
          let standard=checkLang(temp)
          if(standard){
            return standard
          }
        }
        temp=name[j]+temp
      }
    }
    let match=this.content.match(/<span.*?hljs-(comment|keyword|number|string|literal|built_in).*?<\/span>/)
    return match ? 'javascript' : ''
  }

  beforeMerge(){
    let preLayer=' '.repeat((this.layer-1)*4)
    return preLayer+"```"+this.language+'\n'
  }

  afterMerge(){
    let preLayer=' '.repeat((this.layer-1)*4)
    let gap=''
    if(!this.res.endsWith('\n'))gap='\n'
    return gap+preLayer+"```"
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
        let emptyTag=new __Empty__(tagStr,tagName)
        res+=emptyTag.execMerge()
      }else{
        res+=unescape(tagStr)
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

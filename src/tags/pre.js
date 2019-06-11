const Tag =require('../Tag')
const {findValidTag,findTagClass,unescape,checkLang}=require('../utils')

class Pre extends Tag{
  constructor(str,tagName='pre',{layer=1}={}){
    super(str,tagName)
    this.language=''
    this.layer=layer
    this.handleLanguage()
  }


  handleLanguage(){
    let attrs=this.getAttrs()
    let className=attrs['class']
    if(!className)return
    let classArr=className.split(' ')
    for(let i=classArr.length-1;i>=0;i--){
      let temp='',
        name=classArr[i]
      for(let j=name.length-1;j>=0;j--){
        if(!/[a-zA-Z0-9]/.test(name[j])){
          let standard=checkLang(temp)
          if(standard){
            this.language=standard
            return
          }
        }
        temp=name[j]+temp
      }
    }
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="code"){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{match:'```',language:this.language,layer:this.layer})
        res+=subTag.execMerge('','')
      }else{
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='\n',gapAfter='\n'){
    if(this.layer>1){
      gapBefore=''
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}

module.exports=Pre

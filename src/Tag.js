const {findValidTag,findTagClass,parseAttrs,unescape}=require('./utils')


class Tag {
  constructor(str,tagName,{tabSpace='   ',parentTag=''}={}){
    this.tagName=tagName
    this.attrs=[]
    this.content=''
    this.rawStr=str
    this.parentTag=parentTag
    this.needEscape=false
    this.tabSpace=tabSpace
    this.resolveStr(str)
    this.getAttrs=this.getAttrs.bind(this)
    this.getContent=this.getContent.bind(this)
  }

  resolveStr(str){
    if(str[0]!=="<"){
      console.error(`Not a valid tag, current tag name: ${this.tagName}, tag content: ${str}` )
      return
    }
    let openTagAttrs='',i=1
    for(;i<str.length;i++){
      if(str[i]===">")break
      openTagAttrs+=str[i]
    }
    let name=openTagAttrs.split(' ')[0].toLowerCase()
    if(name[name.length-1]==="/")name=name.slice(0,name.length-1)
    if(name!==this.tagName){
      console.warn("tag is not match tagName, tagName in str is "+name+', this.tagName is '+this.tagName)
      return
    }

    this.attrs=parseAttrs(openTagAttrs)
    let restStr=str.slice(i+1)
    let m='',endId=-1
    // console.log(str,restStr)
    for(let j=restStr.length-1;j>=0;j--){
      m=restStr[j]+m
      if(m.startsWith('</')){
        if(m.startsWith('</'+this.tagName+'>')){
          // good
          endId=j
        }
        break
      }
    }
    if(endId===-1){
      console.warn("Tag "+ this.tagName +" has no close.")
      // return
    }
    this.content=restStr.slice(0,endId)
    // for(let j=0;j<restStr.length;j++){
    //   m+=restStr[j]
    //   if(m.endsWith('<'+this.tagName) && restStr[j+1]!=='/'){
    //     count++
    //   }else if(m.endsWith('</'+this.tagName)){
    //     count--
    //     endId=j-this.tagName.length-1
    //   }
    //   if(count===0){
    //     endId=j-this.tagName.length-1
    //     break
    //   }
    // }
    // if(endId===-1){
    //   console.warn("Tag "+ this.tagName +" has no close.")
    //   // return
    // }
    // this.content=restStr.slice(0,endId)
  }

  beforeMerge(){
    return ''
  }

  getContent(){
    return this.content
  }
  getAttrs(){
    return this.attrs
  }


  afterMerge(){
    return ''
  }
  beforeReturn(str){
    return str.replace(/(\n\s*)+$/,'\n')
  }

  handleContent(subBeforeGap,subAfterGap,ignoreNoTags=false){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    // console.log(tagName,tagStr,'-------')
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{parentTag:this.parentTag})
        res+=subTag.execMerge(subBeforeGap,subAfterGap)
        // console.log(res,'###1')
      }else if(!ignoreNoTags){
        tagStr=tagStr.replace(/^(\n)+/,'\n').replace(/\n+$/,'\n')
        res+=unescape(tagStr,{needEscape:this.needEscape}).replace(/^(\n*) +/,'$1 ')
        // console.log(res,'###2')
      }

      if(/^(\s?\n\s*)/.test(res)){
        res='\n'+res.trimLeft()
      }
      if(/(\s?\n\s*)$/.test(res)){
        res=res.trimRight()+'\n'
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  slimContent(str){
    return str
  }

  afterSlim(str){
    return str
  }

  execMerge(gapBefore,gapAfter){
    let str=''+gapBefore
    str+=this.beforeMerge()
    str+=this.slimContent(this.handleContent())
    str+=this.afterMerge()
    str+=gapAfter
    str=this.beforeReturn(str)
    return this.afterSlim(str)
  }
}



module.exports=Tag

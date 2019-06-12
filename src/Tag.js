const {parseAttrs}=require('./utils')

class Tag {
  constructor(str,tagName){
    this.tagName=tagName
    this.attrs=[]
    this.content=''
    this.resolveStr(str)

    this.getAttrs=this.getAttrs.bind(this,this.attrs)
    this.getContent=this.getContent.bind(this,this.content)
  }

  resolveStr(str){
    if(str[0]!=="<"){
      throw new Error("parameter is not a valid tag, str is "+str )
    }
    let openTagAttrs='',i=1
    for(;i<str.length;i++){
      if(str[i]===">")break
      openTagAttrs+=str[i]
    }
    let name=openTagAttrs.split(' ')[0]
    if(name!==this.tagName){
      console.warn("tag is not match tagName, tagName in str is "+name+', this.tagName is '+this.tagName)
      return
    }

    this.attrs=parseAttrs(openTagAttrs)
    let restStr=str.slice(i+1)
    let count=1
    let m='',endId=-1
    for(let j=0;j<restStr.length;j++){
      m+=restStr[j]
      if(m.endsWith('<'+this.tagName)){
        count++
      }else if(m.endsWith('</'+this.tagName)){
        count--
      }
      if(count===0){
        endId=j-this.tagName.length-1
        break
      }
    }
    if(endId===-1){
      throw new Error("tag "+ this.tagName +" has no close,is self-close? use class SelfCloseTag")
    }
    this.content=restStr.slice(0,endId)
  }

  beforeMerge(){
    return ''
  }

  getContent(content){
    return content
  }
  getAttrs(attrs){
    return attrs
  }


  afterMerge(){
    return ''
  }
  beforeReturn(str){
    if(str.endsWith("\n\n")){
      str=str.substring(0,str.length-1)
    }
    return str
  }

  handleContent(content){
    return content
  }

  execMerge(gapBefore,gapAfter){
    let str=''+gapBefore
    str+=this.beforeMerge()
    str+=this.handleContent()
    str+=this.afterMerge()
    str+=gapAfter
    return this.beforeReturn(str)
  }
}



module.exports=Tag
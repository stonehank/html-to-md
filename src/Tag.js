const {parseAttrs}=require('./utils')

class Tag {
  constructor(str,tagName,{tabSpace='   '}={}){
    this.tagName=tagName
    this.attrs=[]
    this.content=''
    this.tabSpace=tabSpace
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
    let name=openTagAttrs.split(' ')[0].toLowerCase()
    if(name[name.length-1]==="/")name=name.slice(0,name.length-1)
    if(name!==this.tagName){
      console.warn("tag is not match tagName, tagName in str is "+name+', this.tagName is '+this.tagName)
      return
    }

    this.attrs=parseAttrs(openTagAttrs)
    // console.log(i,openTagAttrs,str)
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
      console.warn("tag "+ this.tagName +" has no close,is self-close? use class SelfCloseTag")
      return
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
    return str.replace(/(\n\s*)+$/,'\n')
  }

  handleContent(content){
    return content
  }

  afterSlim(str){
    return str
  }

  execMerge(gapBefore,gapAfter){
    let str=''+gapBefore
    str+=this.beforeMerge()
    str+=this.handleContent()
    str+=this.afterMerge()
    str+=gapAfter
    str=this.beforeReturn(str)
    return this.afterSlim(str)
  }
}



module.exports=Tag
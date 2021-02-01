const {parseAttrs}=require('./utils')

class SelfCloseTag {
  constructor(str,tagName,{tagSpace='   '}={}){
    this.tagName=tagName
    this.attrs=[]
    this.resolveStr(str)
    this.tagSpace=tagSpace
    this.getAttrs=this.getAttrs.bind(this,this.attrs)
  }

  resolveStr(str){
    if(str[0]!=="<"){
      throw new Error("parameter is not a valid tag" )
    }
    let openTagAttrs='',i=1
    for(;i<str.length;i++){
      if(str[i]===">")break
      openTagAttrs+=str[i]
    }
    let name=openTagAttrs.split(' ')[0].toLowerCase()
    if(name!==this.tagName){
      console.warn("tag is not match tagName, tagName in str is "+name+', this.tagName is '+this.tagName)
    }
    this.attrs=parseAttrs(openTagAttrs)
  }

  beforeMerge(){
    return ''
  }

  getAttrs(attrs){
    return attrs
  }

  afterMerge(){
    return ''
  }
  beforeReturn(str){
    return str
  }

  handleContent(){
    return ''
  }

  execMerge(gapBefore,gapAfter){
    let str=''+gapBefore
    str+=this.beforeMerge()
    str+=this.handleContent()
    str+=this.afterMerge()
    str+=gapAfter
    str=this.beforeReturn(str)
    return str
  }
}



module.exports=SelfCloseTag
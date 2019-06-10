

class SelfCloseTag {
  constructor(str,tagName){
    this.tagName=tagName
    this.attrs=[]
    this.resolveStr(str)
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
    let attrs=openTagAttrs.split(' ')
    if(attrs[0]!==this.tagName){
      throw new Error("tag is not match tagName")
    }
    this.attrs=attrs.slice(1)
  }

  // 处理tag 属性
  beforeMerge(){
    return ''
  }

  getAttrs(attrs){
    return attrs
  }

  afterMerge(){
    return ''
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
    return str
  }
}



module.exports=SelfCloseTag
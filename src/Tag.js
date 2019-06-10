const {escape,unescape}=require('./escape')

class Tag {
  constructor(str,tagName){
    this.tagName=tagName
    this.attrs=[]
    this.content=''
    this.resolveStr(str)
    // this.beforeOpen=this.beforeOpen.bind(this,this.attrs)
    this.getContent=this.getContent.bind(this,this.content)
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
    let restStr=str.slice(i+1)

    let count=1

    let m='',endId=-1

    // console.log(this.tagName+'\n\n'+restStr+'\n\n'+str+'\n\n------------')
    for(let j=0;j<restStr.length;j++){
      m+=restStr[j]
      if(m.endsWith('<'+this.tagName)){
        count++
      }else if(m.endsWith('</'+this.tagName)){
        count--
      }
      // console.log(m,count)
      if(count===0){
        endId=j-this.tagName.length-1
        break
      }
    }
    if(endId===-1){
      throw new Error("tag has no close,is self-close? use class SelfCloseTag")
    }
    this.content=restStr.slice(0,endId)
    // console.log('\n'+this.content)
  }

  // 处理tag 属性
  beforeMerge(){
    return ''
  }

  getContent(content){
    return content
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



module.exports=Tag
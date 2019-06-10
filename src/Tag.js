const {escape,unescape}=require('./escape')
const parseAttrs=require('./parseAttrs')

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
      throw new Error("parameter is not a valid tag" )
    }
    let openTagAttrs='',i=1
    for(;i<str.length;i++){
      if(str[i]===">")break
      openTagAttrs+=str[i]
    }
    if(openTagAttrs.split(' ')[0]!==this.tagName){
      throw new Error("tag is not match tagName")
    }
    // let attrs=openTagAttrs.match((/[^\s]*?=".*?"/g))
    // console.log(attrs,openTagAttrs)
    this.attrs=parseAttrs(openTagAttrs)
    // for(let j=1;j<attrs.length;j++){
    //   let [key,value]=attrs[j].split('=')
    //   attrsObj[key]=value ? value.replace(/["'`]/g,'') : value
    // }
    // this.attrs=attrsObj
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



module.exports=Tag
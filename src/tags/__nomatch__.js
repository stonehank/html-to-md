const Tag =require('../Tag')
const SelfCloseTag =require('../SelfCloseTag')
const {findValidTag,findTagClass}=require('../utils')

class __NoMatch__ extends Tag{
  constructor(str,tagName='__nomatch__'){
    super(str,tagName)
    this.tagName=tagName
  }

  beforeMerge(){
    return `<${this.tagName}>`
  }

  afterMerge(){
    return `</${this.tagName}>`
  }

  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else{
        res+=tagStr
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(){
    return super.execMerge('','')
  }

}

class __NoMatchSelfClose__ extends SelfCloseTag{
  constructor(str,tagName='__nomatchselfclose__'){
    super(str,tagName)
    this.tagName=tagName
    this.str=str
  }

  execMerge(){
    return this.str
  }

}

module.exports={__NoMatch__,__NoMatchSelfClose__}



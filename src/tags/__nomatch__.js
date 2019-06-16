const Tag =require('../Tag')
const SelfCloseTag =require('../SelfCloseTag')


class __NoMatch__ extends Tag{
  constructor(str,tagName='__nomatch__'){
    super(str,tagName)
    this.tagName=tagName
    this.handleContent=this.handleContent.bind(this,'','')
  }

  beforeMerge(){
    return `<${this.tagName}>`
  }

  afterMerge(){
    return `</${this.tagName}>`
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



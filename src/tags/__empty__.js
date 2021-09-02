const Tag =require('../Tag')
const SelfCloseTag =require('../SelfCloseTag')
/*
*
* <div><b>abc</b></div>
* ==> abc
*
* */
class __Empty__ extends Tag{
  constructor(str,tagName='__empty__',options){
    super(str,tagName,options)
  }
  slim(content){
    return content
  }

  parseValidSubTag(subTagStr, subTagName,options){
    return new __Empty__(subTagStr,subTagName,{
      ...options
    }).exec()
  }

  parseOnlyString(subTagStr, subTagName,options){
    return subTagStr
  }

  exec(){
    return super.exec('','')
  }

}

class __EmptySelfClose__ extends SelfCloseTag{
  constructor(str,tagName='__emptyselfclose__'){
    super(str,tagName)
    this.tagName=tagName
  }


  exec(){
    return super.exec('','')
  }

}

module.exports={__Empty__,__EmptySelfClose__}



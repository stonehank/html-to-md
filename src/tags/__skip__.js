const Tag =require('../Tag')
const SelfCloseTag =require('../SelfCloseTag')
/*
*
* <div><b>abc</b></div>
* ==> **abc**
*
* */

class __Skip__ extends Tag{
  constructor(str,tagName='__skip__'){
    super(str,tagName)
    this.tagName=tagName
    this.handleContent=this.handleContent.bind(this,'','')
  }
  execMerge(){
    return super.execMerge('','')
  }
}

class __SkipSelfClose__ extends SelfCloseTag{
  constructor(str,tagName='__skipselfclose__'){
    super(str,tagName)
    this.tagName=tagName
    this.str=str
  }

  execMerge(){
    return this.str
  }

}

module.exports={__Skip__,__SkipSelfClose__}



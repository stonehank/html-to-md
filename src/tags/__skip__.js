const Tag =require('../Tag')
const SelfCloseTag =require('../SelfCloseTag')
const {needIndependentLine} =require('../utils')
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
    this.handleContent=this.handleContent.bind(this)
  }
  execMerge(){
    let need=needIndependentLine(this.tagName)
    let pre=need ? '\n' : '', aft=need ? '\n' : ''
    return super.execMerge(pre,aft)
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



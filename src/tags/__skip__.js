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
  constructor(str,tagName='__skip__',{parentTag=''}={}){
    super(str,tagName)
    this.tagName=tagName
    this.parentTag=parentTag
    this.noNeedWrap=['td','th']
    this.handleContent=this.handleContent.bind(this)
  }
  afterSlim(str){
    return str.replace(/^\n+/,'\n').replace(/\n+$/,'\n')
  }
  execMerge(){
    let need=needIndependentLine(this.tagName) && !this.noNeedWrap.includes(this.parentTag)
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



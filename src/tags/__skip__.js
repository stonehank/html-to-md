const Tag =require('../Tag')
const SelfCloseTag =require('../SelfCloseTag')
const {needIndependentLine,getRealTagName} =require('../utils')
/*
*
* <div><b>abc</b></div>
* ==> **abc**
*
* */

class __Skip__ extends Tag{
  constructor(str,tagName='__skip__',{parentTag=''}={}){
    super(str,tagName,{parentTag:parentTag})
    this.tagName=tagName
    this.parentTag=parentTag
    this.noNeedWrap=['td','th']
  }

  // afterSlim(str){
  //   return str.replace(/^\n+/,'\n').replace(/\n+$/,'\n')
  // }
  //

  exec(){
    let need=needIndependentLine(getRealTagName(this.tagName)) && !this.noNeedWrap.includes(this.parentTag)
    let pre=need ? '\n' : '', aft=need ? '\n' : ''
    console.log(this.tagName,JSON.stringify(pre),JSON.stringify(aft),this.rawStr)
    return super.exec(pre,aft)
  }
}

class __SkipSelfClose__ extends SelfCloseTag{
  constructor(str,tagName='__skipselfclose__'){
    super(str,tagName)
    this.tagName=tagName
    this.str=str
  }

  exec(){
    return this.str
  }

}

module.exports={__Skip__,__SkipSelfClose__}



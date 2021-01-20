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
    // console.log(str)
  }
  afterSlim(str){
    return str.replace(/^\n+/,'\n').replace(/\n+$/,'\n')
  }
  execMerge(){
    let need=needIndependentLine(this.tagName)
    // let pre='',aft=''
    // if(need){
    //   aft='\n'
    // }
    let pre=need ? '\n' : '', aft=need ? '\n' : ''
    // console.log(this.tagName,pre,aft)
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



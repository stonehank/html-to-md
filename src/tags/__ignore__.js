/*
*
* <div><b>abc</b></div>
* ==> ''
*
* */

class __Ignore__{
  constructor(str,tagName='__ignore__',{parentTag=''}={}){
    this.tagName=tagName
    this.parentTag=parentTag
  }

  execMerge(){
    if(this.parentTag==='li' && this.tagName==='br'){
      return '  \n'
    }
    return ''
  }
}


module.exports=__Ignore__



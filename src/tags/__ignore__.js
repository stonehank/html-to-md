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

  exec(){
    if(this.parentTag==='li' && this.tagName==='br'){
      // BR 必须有2个空位才会换行
      return '  \n'
    }
    return ''
  }
}


module.exports=__Ignore__



const Tag =require('../Tag')
const {findTagClass}=require('../utils')
const needIndependentLine=require('../utils/needIndependentLine')
const {DOUBLE,TRIPLE}=require('../utils/CONSTANT')

/**
 * 内部含有p， 如果是第一个元素，需要最后额外加一个\n，否则开始额外加一个\n
 * 在li内部的元素需要layer，单内部元素的内部则不需要layer
 * 在li内部第一个元素，需要去除所有layer空格，但是原本如果有空行，需要保留空行
 * 在li内部的字符串，只有换行了，才需要layer
 */
class Li extends Tag{
  constructor(str,tagName='li',options){
    super(str,tagName,options)
    // 在没有UL的情况下
    this.match=this.match || '* '
    this.extraGap=''
  }

  beforeMergeSpace(content){
    return this.extraGap+this.leadingSpace + this.match + content
  }

  __calcNextLeading__(){
    return this.match.length===2
        ? DOUBLE
        : this.match.length===3
            ? TRIPLE
            : this.match.length===4 ? DOUBLE
                : TRIPLE+DOUBLE
  }

  parseValidSubTag(subTagStr, subTagName,options) {
    let SubTagClass=findTagClass(subTagName)
    let nextLeading=this.__calcNextLeading__()
    let subTag=new SubTagClass(subTagStr,subTagName,
        {
          ...options,
          calcLeading:true,
          leadingSpace:this.leadingSpace+nextLeading,
          layer:this.layer+1,
        })
    let str=subTag.exec()
    if(subTagName==='p'){
      this.extraGap='\n'
    }
    if(this.isFirstTag){
      return str.trimLeft().replace(this.leadingSpace+nextLeading,'')
    }else{
      return str
    }
  }

  parseOnlyString(subTagStr, subTagName, options) {
    let calcLeading=false
    if(needIndependentLine(options.prevTagName)){
      calcLeading=true
    }
    let nextLeading=this.__calcNextLeading__()
    let str= super.parseOnlyString(subTagStr, subTagName, {
      ...options,
      calcLeading,
      leadingSpace:this.leadingSpace+nextLeading,
      layer:this.layer+1,
    });
    if(this.isFirstTag){
      return str.replace(this.leadingSpace+nextLeading,'')
    }else{
      return str
    }
  }

  beforeReturn(content) {
    return super.beforeReturn(content);
  }


  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}


module.exports=Li


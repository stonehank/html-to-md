const Tag =require('../Tag')
const findValidTag=require('../findValidTag')
const findTagClass=require('../findTagClass')
const {unescape}=require( '../escape')



class Code extends Tag{
  constructor(str,tagName='code',{match='`',language=''}={}){
    super(str,tagName)
    this.match=match
    this.language=language
  }

  beforeMerge(){
    if(this.match==='```')return this.match+this.language+'\n'
    return this.match
  }

  afterMerge(){
    if(this.match==='```')return '\n'+this.match
    return this.match
  }


  handleContent(){
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let res=''
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName==="span"){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','')
      }else{
        res+=unescape(tagStr)
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  execMerge(gapBefore='',gapAfter=''){
    return super.execMerge(gapBefore,gapAfter)
  }

}


module.exports=Code



let code=new Code('<code><span>dfaf</span><a href="https://github.com/nodeca/babelfish/"><i>babelfish</i></a></code>')
//
console.log(code.execMerge())
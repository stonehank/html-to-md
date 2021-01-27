const Tag =require('../Tag')
const {findValidTag,findTagClass,shouldRenderRawInside}=require('../utils')

function countTdNum(str){
  let trStr=''
  for(let i=0;i<str.length;i++){
    if(trStr.endsWith("</tr>")){
      break
    }
    trStr+=str[i]
  }
  return Math.max(trStr.split('</td>').length-1,trStr.split('</th>').length-1)
}

class Table extends Tag{
  constructor(str,tagName='table',{parentTag=''}={}){
    super(str,tagName)
    this.exist_thead=false
    this.exist_tbody=false
    this.empty_tbody=true
    this.parentTag=parentTag
    this.tdNum= countTdNum(this.content)
  }

  handleContent(){
    let res=''
    let content=this.getContent()
    let getNxtValidTag=findValidTag(content)
    let [tagName,tagStr]=getNxtValidTag()
    while(tagStr!==''){
      if(tagName!=null){
        if(tagName==='thead')this.exist_thead=true
        if(tagName==='tbody'){
          this.exist_tbody=true
          this.empty_tbody=false
        }
        if(tagName==='tr'){
          this.empty_tbody=false
        }
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName,{tdNum:this.tdNum})
        res+=subTag.execMerge('','\n')
      }
      let nxt=getNxtValidTag()
      tagName=nxt[0]
      tagStr=nxt[1]
    }
    return res
  }

  beforeReturn(str){
    if(!this.exist_tbody && this.empty_tbody)str=str+'|'+':---|'.repeat(this.tdNum)+'\n'
    else if(!this.exist_tbody)str='|'+':---|'.repeat(this.tdNum)+''+str
    if(!this.exist_thead)str='\n'+'|'.repeat(this.tdNum+1)+(str.startsWith('\n')? '' : '\n')+str
    return str
  }

  execMerge(gapBefore='\n',gapAfter=''){
    if(shouldRenderRawInside.includes(this.parentTag)){
      return this.rawStr
    }
    return super.execMerge(gapBefore,gapAfter)
  }

}
module.exports=Table

const Tag =require('../Tag')
const {findTagClass}=require('../utils')

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
  constructor(str,tagName='table',options){
    super(str,tagName)
    this.exist_thead=false
    this.exist_tbody=false
    this.empty_tbody=true
    this.tdNum= countTdNum(this.content)
  }

  parseValidSubTag(subTagStr, subTagName) {
    if(subTagName==='thead'){
      this.exist_thead=true
    }
    if(subTagName==='tbody'){
      this.exist_tbody=true
      this.empty_tbody=false
    }
    if(subTagName==='tr'){
      this.empty_tbody=false
    }
    let SubTagClass=findTagClass(subTagName)
    let subTag=new SubTagClass(subTagStr,subTagName,{tdNum:this.tdNum})
    return subTag.exec('','\n')
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  beforeReturn(str){
    // console.log('exist head',this.exist_thead, 'exist body',this.exist_tbody, 'empty body',this.empty_tbody,str,'---')
    if(!(this.exist_thead || this.exist_tbody || !this.empty_tbody)){
      return ''
    }
    if(this.tdNum===0)return ''
    if(!this.exist_tbody && this.empty_tbody)str=str+'|'+':---|'.repeat(this.tdNum)+'\n'
    else if(!this.exist_tbody)str='|'+':---|'.repeat(this.tdNum)+''+str
    if(!this.exist_thead)str='\n'+'|'.repeat(this.tdNum+1)+(str.startsWith('\n')? '' : '\n')+str
    return str
  }

  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Table

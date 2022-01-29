const Tag =require('../Tag')
const {findTagClass,getTableAlign}=require('../utils')

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
    this.tableColumnCount= countTdNum(this.content)
  }

  parseValidSubTag(subTagStr, subTagName,options) {
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
    let subTag=new SubTagClass(subTagStr,subTagName,{...options,tableColumnCount:this.tableColumnCount})
    return subTag.exec('','\n')
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  beforeReturn(str){
    // 无head，无body
    if(!(this.exist_thead || this.exist_tbody || !this.empty_tbody))return ''
    // 无内容
    if(this.tableColumnCount===0)return ''
    // 无body 或者 空body
    if(!this.exist_tbody){
      // 从head中获取方向信息
      let alignArr=getTableAlign(this.content,this.tableColumnCount)
      let tableHr='|'
      for(let i=0;i<alignArr.length;i++){
        tableHr+=alignArr[i]
      }
      if(this.empty_tbody){
        str=str+tableHr+'\n'
      }else{
        str=tableHr+''+str
      }
    }
    // 无head
    if(!this.exist_thead)str='\n'+'|'.repeat(this.tableColumnCount+1)+(str.startsWith('\n')? '' : '\n')+str
    return str
  }

  exec(prevGap='\n',endGap='\n'){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Table

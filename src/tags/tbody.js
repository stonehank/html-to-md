const Tag =require('../Tag')
const {findValidTag,findTagClass}=require('../utils')

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

function getTdAlign(str,tdNum){
  let alignObj={
    center:':---:|',
    left:':---|',
    right:"---:|",
    start:':---|',
    end:"---:|"
  }
  let res=Array(tdNum).fill(':---|')
  let match=str.match(/text-align:(center|left|right|start|end)/g)
  if(!match)return res
  // console.log(str,match)
  res=match.slice(0,tdNum)
  res=res.map(s=>{
    let id=s.indexOf('text-align:')
    if(id===-1){
      return alignObj['left']
    }
    return alignObj[s.slice(id+11)] || alignObj['left']
  })
  return res
}

class Tbody extends Tag{
  constructor(str,tagName='tbody'){
    super(str,tagName)
    this.content=this.getContent()

  }

  beforeMerge(){
    let tdNum=countTdNum(this.content)
    let alignArr=getTdAlign(this.content,tdNum)
    let tableHr='|'
    for(let i=0;i<alignArr.length;i++){
      tableHr+=alignArr[i]
    }
    return tableHr+'\n'
  }

  handleContent(){
    let res=''

    let getNxtValidTag=findValidTag(this.content)
    let [tagName,tagStr]=getNxtValidTag()

    while(tagStr!==''){
      if(tagName!=null){
        let SubTagClass=findTagClass(tagName)
        let subTag=new SubTagClass(tagStr,tagName)
        res+=subTag.execMerge('','\n')
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
module.exports=Tbody




const Tag =require('../Tag')


function getTdAlign(str,tdNum){
  let alignObj={
    _default_:'---|',
    center:':---:|',
    left:':---|',
    right:"---:|",
    start:':---|',
    end:"---:|"
  }
  let res=Array(tdNum).fill( alignObj['_default_'])
  let match=str.match(/text-align:(center|left|right|start|end)/g)
  if(!match)return res
  res=match.slice(0,tdNum)
  res=res.map(s=>{
    let id=s.indexOf('text-align:')
    return alignObj[s.slice(id+11)] || alignObj['left']
  })
  return res
}

class Tbody extends Tag{
  constructor(str,tagName='tbody',{tdNum=0}={}){
    super(str,tagName)
    this.tdNum=tdNum
  }

  beforeMergeSpace(content){
    let alignArr=getTdAlign(this.content,this.tdNum)
    let tableHr='|'
    for(let i=0;i<alignArr.length;i++){
      tableHr+=alignArr[i]
    }
    return tableHr+'\n' + content
  }

  parseOnlyString(subTagStr, subTagName, options) {
    return ''
  }

  exec(prevGap='',endGap=''){
    return super.exec(prevGap,endGap)
  }

}
module.exports=Tbody




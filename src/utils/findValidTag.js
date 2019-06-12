const isSelfCloseTag=require("./isSelfCloseTag")

function getTagName(str,id){
  let name=''
  while(/[a-z0-9]/.test(str[id])){
    name+=str[id++]
  }
  return name
}

function findValidTag(str){
  let startId=0
  return ()=>{
    let res=''
    let tagName=null,count=0,tempName='',open=false,canBeBreak=false
    for(let i=startId;i<str.length;i++){
      if(str[i]==="<" && str[i+1]!=="/"){
        if(res!=='' && tagName==null){
          startId=i
          return [tagName,res]
        }
        open=true
        tempName=getTagName(str,i+1)
        if(tagName==null){
          tagName=tempName
        }
        if(tagName===tempName)count++
        if(isSelfCloseTag(tagName)){
          count--
          if(count===0)canBeBreak=true
        }

      }else if(str[i]==='<' && str[i+1]==="/"){
        if(tagName==null){
          throw new Error("tag is not integrity")
        }
        tempName=getTagName(str,i+2)
        if(tagName===tempName){
          count--
        }
        if(count===0)canBeBreak=true
      }
      res+=str[i]
      if(str[i]==='>' && canBeBreak){
        startId=i+1
        return [tagName,res]
      }
    }
    startId=str.length
    return [tagName,res]
  }
}


module.exports=findValidTag
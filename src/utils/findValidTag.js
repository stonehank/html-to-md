const isSelfClosing=require("./isSelfClosing")

function getTagName(str,id){
  let name=''
  while(id<str.length && /[a-zA-Z0-9!]/.test(str[id])){
    name+=str[id++]
  }
  return name.toLowerCase()
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

        if(isSelfClosing(tagName)){
          count--
          if(count===0)canBeBreak=true
          if(count<0)console.warn(`tag ${tagName} is abnormal`)
        }

      }else if(str[i]==='<' && str[i+1]==="/"){
        if(tagName==null){
          console.warn("tag is not integrity, current tagStr is "+str.slice(startId))
          return [null,'']
        }
        tempName=getTagName(str,i+2)
        if(tagName===tempName){
          count--
        }
        if(count<=0)canBeBreak=true
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
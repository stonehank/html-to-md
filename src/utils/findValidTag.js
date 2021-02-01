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
    let startTagName=null,count=0,endTagName=null,canBeBreak=false
    for(let i=startId;i<str.length;i++){
      if(str[i]==="<" && str[i+1]!=="/"){
        if(res!=='' && startTagName==null && !canBeBreak){
          startId=i
          return [startTagName,res]
        }
        let tempName=getTagName(str,i+1)
        if(startTagName==null){
          startTagName=tempName
        }
        if(startTagName===tempName)count++

        if(isSelfClosing(startTagName)){
          count--
          if(count===0)canBeBreak=true
          if(count<0)console.warn(`Tag ${startTagName} is abnormal`)
        }

      }else if(str[i]==='<' && str[i+1]==="/"){
        if(startTagName==null){
          console.warn("Tag is not integrity, current tagStr is "+str.slice(startId))
          let id=i
          while(str[id]!=='>'){
            id++
          }
          i=id
          continue
        }
        endTagName=getTagName(str,i+2)
        if(startTagName===endTagName){
          count--
        }
        if(count<=0)canBeBreak=true
      }
      res+=str[i]
      if(str[i]==='>' && canBeBreak){
        startId=i+1
        return [startTagName,res]
      }
      if(i===str.length-1){
        // console.log(startTagName,endTagName)
        if(startTagName!==endTagName){
          if(endTagName!=null && startTagName!=null){
            res=res.replace('<'+startTagName+'>','')
              .replace('</'+endTagName+'>','')
          }
          startTagName=null
        }
      }
    }

    startId=str.length
    return [startTagName,res]
  }
}


module.exports=findValidTag

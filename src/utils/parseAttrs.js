function parseAttrs(attrStr){
  let obj={},inside=false,key='',value=''
  for(let i=0;i<=attrStr.length;i++){
    if(i===attrStr.length || attrStr[i]===' '){
      if(!inside|| i===attrStr.length){
        obj[key.trim()]=value.trim()
        key=''
        value=''
      }
    }else if(attrStr[i]==='"'){
      inside=!inside
      continue
    }else if(attrStr[i]==="="){
      continue
    }
    if(!inside)key+=attrStr[i]
    else value+=attrStr[i]
  }
  return obj
}

module.exports=parseAttrs
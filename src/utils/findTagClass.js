let ignoreTag={
  'style':true,
  'br':true,
}


function findTagClass(tagName){
  let clazz
  if(ignoreTag[tagName]){
    return require('../tags/__ignore__')
  }
  try{
    clazz=require('../tags/'+tagName)
  }catch(e){
    // console.log(isSelfCloseTag)
    if(tagName==='input'){
      clazz=require('../tags/__nomatch__').__NoMatchSelfClose__
    }else{
      clazz=require('../tags/__nomatch__').__NoMatch__
    }

  }
  return clazz
}

module.exports=findTagClass

// let ignoreTag={
//   'style':true,
//   'br':true,
// }
//
//
// function findTagClass(tagName){
//   let clazz
//   if(ignoreTag[tagName]){
//     return require('../tags/__ignore__')
//   }
//   try{
//     clazz=require('../tags/'+tagName)
//   }catch(e){
//     clazz=require('../tags/__nomatch__').__NoMatch__
//   }
//   return clazz
// }
//
// module.exports=findTagClass
let ignoreTag={
  'style':true,
  'br':true,
}


function findTagClass(tagName){
  let clazz
  // console.log(tagName)
  if(ignoreTag[tagName]){
    return require('../tags/__ignore__')
  }
  try{
    clazz=require('../tags/'+tagName)
  }catch(e){
    clazz=require('../tags/__nomatch__')
  }
  return clazz
}

module.exports=findTagClass
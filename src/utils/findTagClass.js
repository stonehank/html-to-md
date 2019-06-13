
let ignoreTag={
  'style':true,
  'br':true,
}

function findTagClass(tagName){
  let clazz
  if(ignoreTag[tagName] || !tagName){
    return require('../tags/__ignore__')
  }
  try{
    clazz=require('../tags/'+tagName)
  }catch(e){
    if(require('./isSelfCloseTag')(tagName)){
      clazz=require('../tags/__nomatch__').__NoMatchSelfClose__
    }else{
      clazz=require('../tags/__nomatch__').__NoMatch__
    }

  }
  return clazz
}

module.exports=findTagClass
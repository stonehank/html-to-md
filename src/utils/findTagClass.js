
let ignoreTag={
  'style':true,
  'br':true,
  'head':true,
  '!doctype':true
}

function findTagClass(tagName){
  let clazz
  if(ignoreTag[tagName] || !tagName){
    return require('../tags/__ignore__')
  }
  try{
    clazz=require('../tags/'+tagName)
  }catch(e){
    if(require('./isSelfClosing')(tagName)){
      clazz=require('../tags/__nomatch__').__NoMatchSelfClose__
    }else{
      clazz=require('../tags/__nomatch__').__NoMatch__
    }

  }
  return clazz
}

module.exports=findTagClass
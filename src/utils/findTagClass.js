const config =require('../config')


function findTagClass(tagName){
  let clazz
  let {skipTags,emptyTags,ignoreTags}=config.get()
  let isSelfClosing=require('./isSelfClosing')(tagName)
  if(skipTags.includes(tagName)){
    let skip=require('../tags/__skip__')
    return isSelfClosing ? skip.__SkipSelfClose__: skip.__Skip__
  }else if(emptyTags.includes(tagName)){
    let empty=require('../tags/__empty__')
    return isSelfClosing ? empty.__EmptySelfClose__: empty.__Empty__
  }else if(ignoreTags.includes(tagName)){
    return require('../tags/__ignore__')
  }
  try{
    clazz=require('../tags/'+tagName)
  }catch(e){
    if(isSelfClosing){
      clazz=require('../tags/__nomatch__').__NoMatchSelfClose__
    }else{
      clazz=require('../tags/__nomatch__').__NoMatch__
    }

  }
  return clazz
}

module.exports=findTagClass
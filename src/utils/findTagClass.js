const config =require('../config')


function findTagClass(tagName,forceRender=false){
  let clazz
  let {skipTags,emptyTags,ignoreTags,aliasTags}=config.get()
  let isSelfClosing=require('./isSelfClosing')(tagName)
  if(!forceRender && skipTags.includes(tagName)){
    let skip=require('../tags/__skip__')
    return isSelfClosing ? skip.__SkipSelfClose__: skip.__Skip__
  }else if(!forceRender && emptyTags.includes(tagName)){
    let empty=require('../tags/__empty__')
    return isSelfClosing ? empty.__EmptySelfClose__: empty.__Empty__
  }else if(!forceRender && ignoreTags.includes(tagName)){
    return require('../tags/__ignore__')
  }else if(!forceRender && aliasTags[tagName]!=null){
    let newTagName=aliasTags[tagName]
    return findTagClass(newTagName,forceRender)
  }
  if(forceRender){
    if(isSelfClosing){
      clazz=require('../tags/__nomatch__').__NoMatchSelfClose__
    }else{
      clazz=require('../tags/__nomatch__').__NoMatch__
    }
  }else{
    try{
      clazz=require('../tags/'+tagName)
    }catch(e){
      if(isSelfClosing){
        clazz=require('../tags/__nomatch__').__NoMatchSelfClose__
      }else{
        clazz=require('../tags/__nomatch__').__NoMatch__
      }
    }
  }

  return clazz
}

module.exports=findTagClass

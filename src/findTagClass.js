function findTagClass(tagName){
  const clazz=require('./tags/'+tagName)
  return clazz
}

module.exports=findTagClass
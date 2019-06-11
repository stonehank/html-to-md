function findTagClass(tagName){
  let clazz
  try{
    clazz=require('../tags/'+tagName)
  }catch(e){
    clazz=require('../tags/empty')
  }
  return clazz
}

module.exports=findTagClass
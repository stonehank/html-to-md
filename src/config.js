class Config {
  constructor({skipTags=[],emptyTags=[],ignoreTags=[]}={}){
    this.options={
      skipTags,
      emptyTags,
      ignoreTags
    }
  }
  get(){
    return this.options
  }

  clear(){
    this.options={}
  }
  set(obj,force){
    if(Object.prototype.toString.call(obj)==="[object Object]"){
      for(let key in obj){
        if(obj.hasOwnProperty(key)){
          if(force){
            this.options[key]=obj[key]
          }else{
            assign(this.options,obj,key)
          }
        }
      }
    }
  }

  reset(){
    this.options={ignoreTags:['','style','br','head','!doctype','form'],skipTags:['div','html','body'],emptyTags:[]}
  }
}

function assign(obj,newObj,key){
  // console.log(obj,newObj,key)
  if(obj[key]==null){
    obj[key]=newObj[key]
    return
  }
  let isArray=Array.isArray(obj[key]),
    isObj=Object.prototype.toString.call(obj[key])==="[object Object]"
  isArray
    ? obj[key]=obj[key].concat(newObj[key])
    : isObj
      ? obj[key]=Object.assign(obj[key],newObj[key])
      : obj[key]=newObj[key]
}


let config=new Config({ignoreTags:['','style','br','head','!doctype','form'],skipTags:['div','html','body']})

module.exports=config

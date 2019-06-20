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
  set(k,v,force){
    if(Object.prototype.toString.call(k)==="[object Object]"){
      for(let key in k){
        if(k.hasOwnProperty(key)){
          if(v){
            this.options[key]=k[key]
          }else{
            assign(this.options,k,key)
          }
        }
      }
    }else{
      if(force){
        this.options[k]=v
      }else{
        assign(this.options,{[k]:v},k)
      }
    }
  }
}

function assign(obj,newObj,key){
  if(obj[key]==null){
    obj[key]=newObj[key]
    return
  }
  let isArray=Array.isArray(obj[key]),
    isObj=Object.prototype.toString.call(obj[key])==="[object Object]"
  obj[key]=isArray
    ? obj[key].concat(newObj[key])
    : isObj
      ? Object.assign(obj[key],newObj[key])
      : obj[key]=newObj[key]
}


let config=new Config({ignoreTags:['','style','br','head','!doctype']})

module.exports=config
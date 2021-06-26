class Config {
  constructor({skipTags=[],emptyTags=[],ignoreTags=[],aliasTags={}}={}){
    this.options={
      skipTags,
      emptyTags,
      ignoreTags,
      aliasTags
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
    this.options={
      ignoreTags:['style','br','head','!doctype','form','svg'],
      skipTags:['div','html','body','dl','dd','dt'],
      emptyTags:[],
      aliasTags:{
        figure:'div',
        figcaption:'div'
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
  isArray
    ? obj[key]=obj[key].concat(newObj[key])
    : isObj
      ? obj[key]=Object.assign(obj[key],newObj[key])
      : obj[key]=newObj[key]
}


let config=new Config({
  ignoreTags:['','style','br','head','!doctype','form','svg'],
  skipTags:['div','html','body','dl','dd','dt'],
  aliasTags:{
    figure:'div',
    figcaption:'p'
  }
})

module.exports=config

const config =require('../config.js')

function getRealTagName(tagName){
    if(!tagName)return tagName
    let {aliasTags}=config.get()
    if(aliasTags[tagName]!=null){
        return aliasTags[tagName]
    }
    return tagName
}

module.exports=getRealTagName

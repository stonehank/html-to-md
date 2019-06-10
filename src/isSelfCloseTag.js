let selfTags=[
  'img',
  'hr',
  'input'
]

function isSelfCloseTag(tag){
  return selfTags.includes(tag)
}


module.exports=isSelfCloseTag
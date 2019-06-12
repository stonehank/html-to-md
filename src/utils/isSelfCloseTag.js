let selfTags=[
  'img',
  'hr',
  'input',
  'br'
]

function isSelfCloseTag(tag){
  return selfTags.includes(tag)
}


module.exports=isSelfCloseTag
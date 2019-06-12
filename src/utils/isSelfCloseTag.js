let selfTags=[
  'img',
  'hr',
  'input',
  'br',
  'html',
  'meta',
  'link',
]

function isSelfCloseTag(tag){
  return selfTags.includes(tag)
}


module.exports=isSelfCloseTag
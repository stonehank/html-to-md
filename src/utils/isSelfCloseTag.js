let selfTags=[
  'img',
  'hr',
  'input',
  'br',
  'meta',
  'link',
  '!doctype'
]

function isSelfCloseTag(tag){
  return selfTags.includes(tag.toLowerCase())
}


module.exports=isSelfCloseTag
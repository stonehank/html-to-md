let selfTags=[
  'img',
  'hr',
  'input',
  'br',
  'meta',
  'link',
  '!doctype',
  'base',
  'col',
  'area',
  'param',
  'object',
  'embed',
  'keygen',
  'source',
]

function isSelfClosing(tag){
  return selfTags.includes(tag.toLowerCase())
}


module.exports=isSelfClosing
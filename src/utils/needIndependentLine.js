let independentLineTags=[
  'html',
  'body',
  'p',
  'div',
  'form',
  'hr',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'dl',
  'dd',
  'dt'
]

function needIndependentLine(tagName){
  return independentLineTags.includes(tagName)
}

module.exports=needIndependentLine

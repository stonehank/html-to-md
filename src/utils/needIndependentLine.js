let independentLineTags=[
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
]

function needIndependentLine(tagName){
  return independentLineTags.includes(tagName)
}

module.exports=needIndependentLine
let lang={
  'js':'javascript',
  'javascript':'javascript',
  'java':'java',
  'python':'python',
  'py':'python',
  'c++':'cpp',
  'cpp':'cpp',
}

function checkLang(key){
  return lang[key]
}

module.exports=checkLang
/*
* {
  'js':'javascript',
  'javascript':'javascript',
  'java':'java',
  'python':'python',
  'py':'python',
  'cpp':'cpp',
  'c++':'cpp',
  'css':'css',
  'html':'html',
  'markdown':'markdown',
  'md':'markdown'
  'c':'c'
}
* */


const toStandard={
  'js':'javascript',
  'py':'python',
  'c++':'cpp',
  'md':'markdown'
}

function getLanguage(str){
  let matchLang=str.match(/<.*?class=".*?language-(\bc\b|\bjava\b|\bjs\b|\bjavascript\b|\bpython\b|\bcpp\b|\bc\+\+\b|\bpy\b|\bcss\b|\bhtml\b|\bmarkdown\b|\bmd\b)".*?>/)
  if(matchLang)return toStandard[matchLang[1]] || matchLang[1]
  let match=str.match(/<span.*?hljs-(comment|keyword|number|string|literal|built_in|function|title|bullet).*?<\/span>/)
  return match ? 'javascript' : ''
}

module.exports=getLanguage
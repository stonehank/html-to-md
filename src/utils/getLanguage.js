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
  'md':'md',
  'c':'c'
}
* */


const toStandard={
  'js':'javascript',
  'py':'python',
  'c++':'cpp',
}

function getLanguage(str){
  let matchLang=str.match(/<.*?class=".*?language-(\bc\b|\bjava\b|\bjs\b|\bjavascript\b|\bpython\b|\bcpp\b|\bc\+\+\b|\bpy\b|\bcss\b|\bhtml\b|\bmarkdown\b)".*?>/)
  if(matchLang)return toStandard[matchLang[1]] || matchLang[1]
  let match=str.match(/<span.*?hljs-(comment|keyword|number|string|literal|built_in|function|title).*?<\/span>/)
  return match ? 'javascript' : ''
}

module.exports=getLanguage
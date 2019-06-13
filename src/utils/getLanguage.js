function getLanguage(str){
  let matchLang=str.match(/<.*?class=".*?language-(\bjava\b|\bjs\b|\bjavascript\b|\bpython\b|\bcpp\b|\bpy\b|\bcss\b|\bhtml\b|\bmarkdown\b)".*?>/)
  if(matchLang)return matchLang[1]
  let match=str.match(/<span.*?hljs-(comment|keyword|number|string|literal|built_in|function|title).*?<\/span>/)
  return match ? 'javascript' : ''
}

module.exports=getLanguage
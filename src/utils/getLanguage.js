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

// const toStandard={
//   'js':'javascript',
//   'py':'python',
//   'c++':'cpp',
//   'md':'markdown'
// }

const DEFAULT_LANG = 'javascript'

// only exec in pre tag
function getLanguage(str) {
  const matchLang = str.match(/<.*?class=".*?language-([^\s"]*)?.*".*>/)
  if (matchLang) return matchLang[1] || ''
  const match = str.match(
    /<span.*?hljs-(comment|keyword|number|string|literal|built_in|function|title|bullet).*?<\/span>/
  )
  return match ? DEFAULT_LANG : ''
}

export default getLanguage

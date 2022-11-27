const unescapeMap: Record<string, string> = {}
const escapeMap: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
  '“': '&ldquo;',
  '”': '&rdquo;',
}

for (const key in escapeMap) {
  unescapeMap[escapeMap[key]] = key
}

// const reUnescapedHtml = /[&<>"'`“”]/g
// const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#x60|ldquo|rdquo);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)
const _extra_escapes: [RegExp, string][] = [
  [/\\/g, '\\\\'],
  [/\*/g, '\\*'],
  [/^-/g, '\\-'],
  [/^\+ /g, '\\+ '],
  [/^(=+)/g, '\\$1'],
  [/^(#{1,6}) /g, '\\$1 '],
  [/`/g, '\\`'],
  [/^~~~/g, '\\~~~'],
  [/\[/g, '\\['],
  [/\]/g, '\\]'],
  [/^>/g, '\\>'],
  [/_/g, '\\_'],
  [/^(\d+)\. /g, '$1\\. '],
]
// function escape(s: string): string {
//   return s && reHasUnescapedHtml.test(s)
//     ? s.replace(reUnescapedHtml, (chr) => escapeMap[chr])
//     : s
// }

function unescapeStr(s: string): string {
  s =
    s && reHasEscapedHtml.test(s)
      ? s.replace(reEscapedHtml, (entity) => unescapeMap[entity])
      : s
  return s
}

function extraEscape(s: string): string {
  return _extra_escapes.reduce(function (accumulator, escape) {
    return accumulator.replace(escape[0], escape[1])
  }, s)
}

export { extraEscape, unescapeStr }

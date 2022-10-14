const unescapeMap = {}
const escapeMap = {
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

const reUnescapedHtml = /[&<>"'`“”]/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
const reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#x60|ldquo|rdquo);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)
const _extra_escapes = [
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
function escape(s) {
  return s && reHasUnescapedHtml.test(s)
    ? s.replace(reUnescapedHtml, (chr) => escapeMap[chr])
    : s
}

function unescapeStr(s, { needEscape = false } = {}) {
  s =
    s && reHasEscapedHtml.test(s)
      ? s.replace(reEscapedHtml, (entity) => unescapeMap[entity])
      : s
  if (needEscape) {
    s = _extra_escapes.reduce(function (accumulator, escape) {
      return accumulator.replace(escape[0], escape[1])
    }, s)
  }
  return s
}

function extraEscape(s) {
  return _extra_escapes.reduce(function (accumulator, escape) {
    return accumulator.replace(escape[0], escape[1])
  }, s)
}

export { escape, extraEscape, unescapeStr }

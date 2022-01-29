let unescapeMap = {};
let escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '`': '&#x60;',
};

for (let key in escapeMap) {
  unescapeMap[escapeMap[key]] = key;
}

let reUnescapedHtml = /[&<>"'`]/g
let reHasUnescapedHtml = RegExp(reUnescapedHtml.source)
let reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#x60);/g
let reHasEscapedHtml = RegExp(reEscapedHtml.source)
let _extra_escapes = [
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
  [/^(\d+)\. /g, '$1\\. ']
]
function escape(s) {
  return (s && reHasUnescapedHtml.test(s)) ?
    s.replace(reUnescapedHtml, (chr) => escapeMap[chr]) :
    s
}

function unescape(s,{needEscape=false}={}) {
  s= (s && reHasEscapedHtml.test(s)) ?
    s.replace(reEscapedHtml, (entity) => unescapeMap[entity]) :
    s
  if(needEscape){
    s= _extra_escapes.reduce(function (accumulator, escape) {
      return accumulator.replace(escape[0], escape[1])
    }, s)
  }
  return s

}

function extraEscape(s){
  return _extra_escapes.reduce(function (accumulator, escape) {
    return accumulator.replace(escape[0], escape[1])
  }, s)
}

module.exports = {
  escape,
  extraEscape,
  unescape
}

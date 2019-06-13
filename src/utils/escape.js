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

function escape(s) {
  return (s && reHasUnescapedHtml.test(s)) ?
    s.replace(reUnescapedHtml, (chr) => escapeMap[chr]) :
    s
}

function unescape(s) {
  return (s && reHasEscapedHtml.test(s)) ?
    s.replace(reEscapedHtml, (entity) => unescapeMap[entity]) :
    s
}

module.exports = {
  escape,
  unescape
}
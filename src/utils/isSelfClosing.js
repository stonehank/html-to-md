const selfTags = {
  img: true,
  hr: true,
  input: true,
  br: true,
  meta: true,
  link: true,
  '!doctype': true,
  base: true,
  col: true,
  area: true,
  param: true,
  object: true,
  embed: true,
  keygen: true,
  source: true,
}

function isSelfClosing(tag) {
  return !!selfTags[tag.toLowerCase()]
}

module.exports = isSelfClosing

const selfTags: Record<string, boolean> = {
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

function isSelfClosing(tag: string | null): boolean {
  if (tag == null) return false
  return !!selfTags[tag.toLowerCase()]
}

export default isSelfClosing

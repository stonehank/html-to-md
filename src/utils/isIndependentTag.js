import getRealTagName from './getRealTagName'

const independentLineTags = {
  html: true,
  body: true,
  p: true,
  div: true,
  pre: true,
  section: true,
  blockquote: true,
  aside: true,
  li: true,
  ul: true,
  ol: true,
  form: true,
  hr: true,
  h1: true,
  h2: true,
  h3: true,
  h4: true,
  h5: true,
  h6: true,
  dl: true,
  dd: true,
  dt: true,
  br: true,
}

function isIndependentTag(tagName) {
  if (!tagName) return false
  const realName = getRealTagName(tagName)
  return !!independentLineTags[realName]
}

export default isIndependentTag

import { TagName } from '../type'
import getRealTagName from './getRealTagName'

const independentLineTags: Record<string, boolean> = {
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
  table: true,
}

function isIndependentTag(tagName?: TagName): boolean {
  if (!tagName) return false
  const realName = getRealTagName(tagName)
  if (!realName) return false
  return !!independentLineTags[realName]
}

export default isIndependentTag

import { TagName } from '../type'
import getRealTagName from './getRealTagName'

const spacePassingTag: Record<string, boolean> = {
  b: true,
  a: true,
  del: true,
  em: true,
  i: true,
  s: true,
  span: true,
  strong: true,
}

function isSpacePassingTag(tagName?: TagName): boolean {
  if (tagName === null) return true
  if (!tagName) return false
  const realName = getRealTagName(tagName)
  if (!realName) return false
  return !!spacePassingTag[realName]
}

export default isSpacePassingTag

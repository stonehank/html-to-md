import { Html2MdOptions, TagListenerProps, TagName } from './type'

interface Config {
  options: Html2MdOptions
}

class Config {
  constructor({
    skipTags = [],
    emptyTags = [],
    ignoreTags = [],
    aliasTags = {},
    renderCustomTags = true,
    tagListener = (tag: TagName, props: TagListenerProps) => props,
  } = {}) {
    this.options = {
      skipTags,
      emptyTags,
      ignoreTags,
      aliasTags,
      renderCustomTags,
      tagListener,
    }
  }

  get() {
    return this.options
  }

  clear() {
    this.options = {}
  }

  set(obj: Html2MdOptions | undefined, force: boolean) {
    if (!obj) return
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      ;(Object.keys(obj) as (keyof typeof obj)[]).forEach((key) => {
        if (force) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          this.options[key] = obj[key]
        } else {
          assign(this.options, obj, key)
        }
      })
    }
  }

  reset() {
    this.options = JSON.parse(JSON.stringify(defaultOptions))
    this.options.tagListener = (tag: TagName, props: TagListenerProps) => props
  }
}

function assign(
  obj: Record<string, any>,
  newObj: Record<string, unknown>,
  key: string
) {
  if (!(key in obj)) {
    obj[key] = newObj[key]
    return
  }
  const isArray = Array.isArray(obj[key])
  const isObj = Object.prototype.toString.call(obj[key]) === '[object Object]'
  isArray
    ? (obj[key] = obj[key].concat(newObj[key]))
    : isObj
    ? (obj[key] = Object.assign(obj[key], newObj[key]))
    : (obj[key] = newObj[key])
}

const defaultOptions = {
  ignoreTags: [
    '',
    'style',
    'head',
    '!doctype',
    'form',
    'svg',
    'noscript',
    'script',
    'meta',
  ],
  skipTags: [
    'div',
    'html',
    'body',
    'nav',
    'section',
    'footer',
    'main',
    'aside',
    'article',
    'header',
  ],
  emptyTags: [],
  aliasTags: {
    figure: 'p',
    dl: 'p',
    dd: 'p',
    dt: 'p',
    figcaption: 'p',
  },
  renderCustomTags: true,
}
const config = new Config()
config.reset()

export default config

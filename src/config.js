class Config {
  // renderCustomTags true, false, [SKIP, IGNORE, EMPTY]
  constructor({
    skipTags = [],
    emptyTags = [],
    ignoreTags = [],
    aliasTags = {},
    renderCustomTags = true,
  } = {}) {
    this.options = {
      skipTags,
      emptyTags,
      ignoreTags,
      aliasTags,
      renderCustomTags,
    }
  }

  get() {
    return this.options
  }

  clear() {
    this.options = {}
  }

  set(obj, force) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (force) {
            this.options[key] = obj[key]
          } else {
            assign(this.options, obj, key)
          }
        }
      }
    }
  }

  reset() {
    this.options = JSON.parse(JSON.stringify(defaultOptions))
  }
}

function assign(obj, newObj, key) {
  if (obj[key] == null) {
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
const config = new Config(JSON.parse(JSON.stringify(defaultOptions)))

module.exports = config

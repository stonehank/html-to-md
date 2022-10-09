const Del = require('./del')

class S extends Del {
  constructor (str, tagName = 's', options) {
    super(str, tagName, options)
  }

  exec (prevGap, endGap) {
    return super.exec(prevGap, endGap)
  }
}

module.exports = S

import Strong from './strong'

class B extends Strong {
  constructor(str, tagName = 'b', options) {
    super(str, tagName, options)
  }

  exec(prevGap, endGap) {
    return super.exec(prevGap, endGap)
  }
}

export default B

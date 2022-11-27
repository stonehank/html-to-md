import __Heading__ from './__Heading__'

class H1 extends __Heading__ {
  constructor(str: string, tagName = 'h1') {
    super(str, tagName)
    this.match = '#'
  }

  exec(prevGap = '\n', endGap = '\n') {
    return super.exec(prevGap, endGap)
  }
}

export default H1

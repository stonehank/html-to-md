import Del from './del'

class S extends Del {
  constructor(str: string, tagName = 's') {
    super(str, tagName)
  }

  exec(prevGap: string, endGap: string) {
    return super.exec(prevGap, endGap)
  }
}

export default S

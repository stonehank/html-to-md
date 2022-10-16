import { TagOptions } from '../type'
import Strong from './strong'

class B extends Strong {
  constructor(str: string, tagName = 'b', options: TagOptions) {
    super(str, tagName, options)
  }

  exec(prevGap: string, endGap: string) {
    return super.exec(prevGap, endGap)
  }
}

export default B

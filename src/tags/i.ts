import { TagOptions } from '../type'
import Em from './em'

class I extends Em {
  constructor(str: string, tagName = 'i', options: TagOptions) {
    super(str, tagName, options)
  }

  exec(prevGap: string, endGap: string) {
    return super.exec(prevGap, endGap)
  }
}

export default I

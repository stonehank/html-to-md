type AlignKeys = 'center' | 'left' | 'right' | 'start' | 'end'

function getTableAlign(str: string, tableColumnCount: number) {
  const alignObj = {
    _default_: '---|',
    center: ':---:|',
    left: ':---|',
    right: '---:|',
    start: ':---|',
    end: '---:|',
  }
  let res = Array(tableColumnCount).fill(alignObj._default_)
  const match = str.match(/<(td|th)(.*?)>/g)
  if (!match) return res
  res = match.slice(0, tableColumnCount)
  // console.log(res,match,str)
  res = res.map((s) => {
    const alignMatch: [unknown, AlignKeys] | null = s.match(
      /align\s*=\s*['"]\s*(center|left|right|start|end)/
    )
    const styleMatch: [unknown, AlignKeys] | null = s.match(
      /text-align\s*:\s*(center|left|right|start|end)/
    )
    // Style first
    if (!alignMatch && !styleMatch) {
      return alignObj._default_
    } else if (alignMatch && !styleMatch) {
      return alignObj[alignMatch[1]] || alignObj._default_
    } else if (styleMatch) {
      return alignObj[styleMatch[1]] || alignObj._default_
    }
  })

  return res
}
export default getTableAlign

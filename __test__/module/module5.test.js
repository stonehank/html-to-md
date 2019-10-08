const html2Md = require('../../src/index')

describe('test special', () => {

  it('h1 Text should be next line', () => {
    let str = `<ul>
<li>
<h1>h1</h1>Should Be Next Line</li>
</ul>`
    expect(html2Md(str)).toBe(`
*  # h1
   Should Be Next Line
`)
  })

  it('h3 Text should be next line', () => {
    let str = `<ul>
<li>
<h3>h3</h3>Should Be Next Line</li>
</ul>`
    expect(html2Md(str)).toBe(`
*  ### h3
   Should Be Next Line
`)
  })


})



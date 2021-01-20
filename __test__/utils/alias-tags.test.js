let html2Md=require('../../src/index')


describe('替换标签',()=>{

  it('figure as div',()=>{
    expect(html2Md('<figure>Figure show as div</figure>')).toBe("Figure show as div")
  })

  it('figcaption as p',()=>{
    expect(html2Md(
`<figure>
  <img src="someimg.jpg" alt="" style="width:100%">
  <figcaption>Fig.1 - Trulli, Puglia, Italy.</figcaption>
</figure>`)).toBe("\n" +
      "![](someimg.jpg)\n" +
      " \n" +
      "Fig.1 - Trulli, Puglia, Italy.\n")
  })

})

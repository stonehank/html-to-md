import Span from '../../src/tags/span'


describe('test <span></span> tag',()=>{
  it('no nest',()=>{
    let span=new Span("<span>javascript</span>")
    expect(span.execMerge()).toBe("javascript")
  })

  it('can not nest, because span only exist in <pre></pre>',()=>{
    let span=new Span("<span><strong>strong</strong></span>")
    expect(span.execMerge()).toBe("<strong>strong</strong>")
  })
})
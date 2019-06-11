import P from '../../src/tags/p'


describe('test <p></p> tag',()=>{
  it('textNode',()=>{
    let p=new P("<p>This is paragraph</p>")
    expect(p.execMerge()).toBe("\nThis is paragraph\n")
  })
  it('nest',()=>{
    let p=new P("<p><b>bold</b></p>")
    expect(p.execMerge()).toBe("\n**bold**\n")
  })
})
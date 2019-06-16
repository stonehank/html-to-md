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

  it('nest2',()=>{
    let p=new P("<p><s><f>SD<f>S<f>SDF&lt;&gt;S<f>SDF&lt;&gt;</f></f></f></f></s></p>")
    expect(p.execMerge()).toBe('\n' +
      '~~<f>SD<f>S<f>SDF&lt;&gt;S<f>SDF&lt;&gt;</f></f></f></f>~~\n')
  })
})
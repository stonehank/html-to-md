import B from '../../src/tags/b'

describe("test <b></b> tag",()=>{
  it('no nest',()=>{
    let b=new B("<b>b</b>")
    expect(b.execMerge()).toBe("**b**")
  })

  it('can nest',()=>{
    let b=new B("<b><i>b and italic</i></b>")
    expect(b.execMerge()).toBe("***b and italic***")
  })
})

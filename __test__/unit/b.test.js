import B from '../../src/tags/b'

describe("test <b></b> tag",()=>{
  it('no nest',()=>{
    let b=new B("<b>b</b>")
    expect(b.exec()).toBe("**b**")
  })

  it('can nest',()=>{
    let b=new B("<b><i>b and italic</i></b>")
    expect(b.exec()).toBe("***b and italic***")
  })

  it('换行需要省略',()=>{
    let b=new B("<b>\n" +
      "<i>b and italic</i>\n" +
      "</b>")
    expect(b.exec()).toBe("***b and italic***")
  })
})

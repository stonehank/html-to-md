import Strong from '../../src/tags/strong'
import B from "../../src/tags/b";

describe("test <strong></strong> tag",()=>{
  it('no nest',()=>{
    let strong=new Strong("<strong>strong</strong>")
    expect(strong.exec()).toBe("**strong**")
  })

  it('can nest',()=>{
    let strong=new Strong("<strong><i>strong and italic</i></strong>")
    expect(strong.exec()).toBe("***strong and italic***")
  })

  it('换行需要省略',()=>{
    let strong=new Strong("<strong>\n" +
      "<i>b and italic</i>\n" +
      "</strong>")
    expect(strong.exec()).toBe("***b and italic***")
  })
})

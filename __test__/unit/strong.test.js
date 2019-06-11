import Strong from '../../src/tags/strong'

describe("test <strong></strong> tag",()=>{
  it('no nest',()=>{
    let strong=new Strong("<strong>strong</strong>")
    expect(strong.execMerge()).toBe("**strong**")
  })

  it('can nest',()=>{
    let strong=new Strong("<strong><i>strong and italic</i></strong>")
    expect(strong.execMerge()).toBe("***strong and italic***")
  })
})

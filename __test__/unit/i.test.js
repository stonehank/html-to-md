import I from '../../src/tags/i'


describe('test <i></i> tag',()=>{
  it('no nest',()=>{
    let i=new I("<i>javascript</i>")
    expect(i.exec()).toBe("*javascript*")
  })

  it('can nest',()=>{
    let i=new I("<i><strong>strong and italic</strong></i>")
    expect(i.exec()).toBe("***strong and italic***")
  })
})

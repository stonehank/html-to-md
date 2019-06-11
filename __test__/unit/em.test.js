import Em from '../../src/tags/em'


describe('test <em></em> tag',()=>{
  it('no nest',()=>{
    let em=new Em("<em>javascript</em>")
    expect(em.execMerge()).toBe("*javascript*")
  })

  it('can nest',()=>{
    let em=new Em("<em><strong>strong and italic</strong></em>")
    expect(em.execMerge()).toBe("***strong and italic***")
  })
})
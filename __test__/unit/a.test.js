import A from '../../src/tags/a'

describe('test <a></a> tag',()=>{
  it('has href',()=>{
    let a=new A("<a href=\"https://nodeca.github.io/pica/demo/\"><strong>pica</strong></a>")
    expect(a.execMerge()).toBe("[**pica**](https://nodeca.github.io/pica/demo/)")
  })
  it('no href',()=>{
    let a=new A("<a><strong>pica</strong></a>")
    expect(a.execMerge()).toBe("[**pica**]()")
  })
})

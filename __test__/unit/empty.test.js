import Empty from '../../src/tags/empty'


describe('test empty(not match) tag',()=>{
  it('if not match, do nothing ',()=>{
    let empty=new Empty("<sub>javascript</sub>","sub")
    expect(empty.execMerge()).toBe("<sub>javascript</sub>")
  })

  it('have match tag',()=>{
    let empty=new Empty("<sup><i>javascript</i></sup>","sup")
    expect(empty.execMerge()).toBe("<sup>*javascript*</sup>")
  })


})
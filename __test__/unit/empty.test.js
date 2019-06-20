import {__NoMatch__,__NoMatchSelfClose__} from '../../src/tags/__nomatch__'


describe('test empty(not match) tag',()=>{
  it('if not match, do nothing ',()=>{
    let empty=new __NoMatch__("<sub>javascript</sub>","sub")
    expect(empty.execMerge()).toBe("<sub>javascript</sub>")
  })

  it('have match tag',()=>{
    let empty=new __NoMatch__("<sup><i>javascript</i></sup>","sup")
    expect(empty.execMerge()).toBe("<sup>*javascript*</sup>")
  })

  it('no match self-close tag',()=>{
    let empty=new __NoMatchSelfClose__("<embed att1='someAttr'/>","embed")
    expect(empty.execMerge()).toBe("<embed />")
  })


})
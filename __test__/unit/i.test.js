let html2Md=require('../../src/index')
const {SYMBOL_I,SYMBOL_B}=require('../options')

describe('test <i></i> tag',()=>{
  it('no nest',()=>{
    expect(html2Md("<i>javascript</i>")).toBe(SYMBOL_I+"javascript"+SYMBOL_I)
  })

  it('can nest',()=>{
    expect(html2Md("<i><strong>strong and italic</strong></i>")).toBe(SYMBOL_I+SYMBOL_B+"strong and italic"+SYMBOL_B+SYMBOL_I)
  })
})

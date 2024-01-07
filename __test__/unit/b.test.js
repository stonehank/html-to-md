// import B from '../../src/tags/b'
import html2Md from '../../src/index'
import {SYMBOL_I,SYMBOL_B} from '../options'

describe("test <b></b> tag",()=>{
  it('no nest',()=>{
    let b=html2Md("<b>b</b>")
    expect(b).toBe(SYMBOL_B+"b"+SYMBOL_B)
  })

  it('can nest',()=>{
    let b=html2Md("<b><i>b and italic</i></b>")
    expect(b).toBe("***b and italic***")
  })

  it('换行需要省略',()=>{
    let b=html2Md("<b>\n" +
      "<i>b and italic</i>\n" +
      "</b>")
    expect(b).toBe("***b and italic***")
  })

  it('Space can be pass to next tag',()=>{
    let b1=html2Md("This is a<b> good </b>thing")
    let b2=html2Md("This is a <b> good </b> thing")
    let b3=html2Md("This is a <b>good</b> thing")
    let b4=html2Md("This is a<b>good</b>thing")
    expect(b1).toBe("This is a **good** thing")
    expect(b2).toBe("This is a **good** thing")
    expect(b3).toBe("This is a **good** thing")
    expect(b4).toBe("This is a**good**thing")
  })
})

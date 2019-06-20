let html2Md=require('../../src/index')
let config=require('../../src/config')

describe('跳过指定的tag标签，内部不影响',()=>{

  beforeEach(()=>{
    config.set('skipTags',[],true)
  })

  it('跳过空白tag',()=>{
    expect(html2Md("<>abc</>",{skipTags:['']})).toBe('abc')
  })

  it('跳过空白tag，内部不变',()=>{
    expect(html2Md("<><b><i>abc</i></b></>",{skipTags:['']})).toBe('***abc***')
  })

  it('跳过b 和 i',()=>{
    expect(html2Md("<b><i>abc</i></b>",{skipTags:['b','i']})).toBe('abc')
  })

  it('跳过del 和 i',()=>{
    expect(html2Md("<del><b><i>abc</i></b></del>",{skipTags:['del','i']})).toBe('**abc**')
  })

  it('跳过 b',()=>{
    expect(html2Md("<b><i>abc</i></b>",{skipTags:['b']})).toBe('*abc*')
  })


  it('跳过 i',()=>{
    expect(html2Md("<b><i>abc</i></b>",{skipTags:['i']})).toBe('**abc**')
  })
})

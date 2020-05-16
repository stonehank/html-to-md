let html2Md=require('../../src/index')
let config=require('../../src/config')

describe('跳过指定的tag标签，内部不影响',()=>{

  beforeEach(()=>{
    config.reset()
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

  it('默认情况html不解析',()=>{
    expect(html2Md("<html><i>abc</i></html>")).toBe('<html>*abc*</html>')
  })

  it('跳过 html 和 div',()=>{
    expect(html2Md("<html><div><i>abc</i></div></html>",{skipTags:['html']})).toBe('\n' +
      '*abc*\n')
  })

  it('只跳过 html',()=>{
    expect(html2Md("<html><div><i>abc</i></div></html>",{skipTags:['html']},true)).toBe('<div>*abc*</div>')
  })
})

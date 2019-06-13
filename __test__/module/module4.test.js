const html2Md=require('../../src/index')

describe('test special',()=>{

  it('test-1',()=>{
    let str="<body"
    expect(html2Md(str)).toBe("<body></body>")
  })
  it('test-2',()=>{
    let str="<!DOCTYPE><html><body><i>abc<b>xxx</b></i></body></html>"
    expect(html2Md(str)).toBe("<!DOCTYPE><html><body>*abc**xxx***</body></html>")
  })


})

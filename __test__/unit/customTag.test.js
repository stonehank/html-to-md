let html2Md=require('../../src/index')


describe('测试自定义标签',()=>{


  it('渲染自定义标签 ',()=>{
    expect(html2Md("<custom-tag>1234<b>BOLD</b></custom-tag>", {renderCustomTag: true})).toBe("<custom-tag>1234**BOLD**</custom-tag>")
  })


  it('渲染自定义标签为 SKIP ',()=>{
    expect(html2Md("<custom-tag>1234<b>BOLD</b></custom-tag>",{renderCustomTag: 'SKIP'})).toBe("1234**BOLD**")
    expect(html2Md("<custom-tag>1234<b>BOLD</b></custom-tag>",{renderCustomTag: false})).toBe("1234**BOLD**")
  })

  it('渲染自定义标签为 EMPTY',()=>{
    expect(html2Md("<custom-tag>1234<b>BOLD</b></custom-tag>",{renderCustomTag: 'EMPTY'})).toBe('1234BOLD')
  })


  it('渲染自定义标签为 IGNORE',()=>{
    expect(html2Md("<custom-tag>1234<b>BOLD</b></custom-tag>",{renderCustomTag: 'IGNORE'})).toBe('')
  })
})

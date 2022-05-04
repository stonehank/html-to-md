import P from '../../src/tags/p'


describe('test <p></p> tag',()=>{
  it('textNode',()=>{
    let p=new P("<p>This is paragraph</p>")
    expect(p.exec()).toBe("\nThis is paragraph\n")
  })
  it('nest',()=>{
    let p=new P("<p><b>bold</b></p>")
    expect(p.exec()).toBe("\n**bold**\n")
  })

  it('nest2',()=>{
    let p=new P("<p><s><f>SD<f>S<f>SDF&lt;&gt;S<f>SDF&lt;&gt;</f></f></f></f></s></p>")
    expect(p.exec()).toBe('\n' +
      '~~<f>SD<f>S<f>SDF&lt;&gt;S<f>SDF&lt;&gt;</f></f></f></f>~~\n')
  })

  it('p tag inside string, should have extra gap',()=>{
    let p=new P("<p>一款集成了模拟和拦截<p>请求并拥有一</p>定编程能力的谷歌浏览器插件...</p>")
    expect(p.exec()).toBe("\n" +
        "一款集成了模拟和拦截\n" +
        "\n" +
        "请求并拥有一\n" +
        "\n" +
        "定编程能力的谷歌浏览器插件...\n")
  })
})

import Img from '../../src/tags/img'


describe('test <img /> tag',()=>{
  it('has alt',()=>{
    let img=new Img("<img src=\"https://octodex.github.com/images/minion.png\" alt=\"Minion\">")
    expect(img.exec()).toBe("![Minion](https://octodex.github.com/images/minion.png)")
  })

  it('no alt',()=>{
    let img=new Img("<img src=\"https://octodex.github.com/images/minion.png\" >")
    expect(img.exec()).toBe("![](https://octodex.github.com/images/minion.png)")
  })

  it('empty alt',()=>{
    let img=new Img("<img src=\"https://octodex.github.com/images/minion.png\" alt=\"\">")
    expect(img.exec()).toBe("![](https://octodex.github.com/images/minion.png)")
  })
})

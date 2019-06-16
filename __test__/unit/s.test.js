import S from '../../src/tags/s'


describe('test <s></s> tag',()=>{
  it('no nest',()=>{
    let s=new S("<s>javascript</s>")
    expect(s.execMerge()).toBe("~~javascript~~")
  })

  it('can nest',()=>{
    let s=new S("<s><a href=\"https://github.com/nodeca/babelfish/\"><i>babelfish</i></a></s>")
    expect(s.execMerge()).toBe("~~[*babelfish*](https://github.com/nodeca/babelfish/)~~")
  })
})
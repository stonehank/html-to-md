import Del from '../../src/tags/del'


describe('test <del></del> tag',()=>{
  it('no nest',()=>{
    let del=new Del("<del>javascript</del>")
    expect(del.execMerge()).toBe(" ~~javascript~~")
  })

  it('can nest',()=>{
    let del=new Del("<del><a href=\"https://github.com/nodeca/babelfish/\"><i>babelfish</i></a></del>")
    expect(del.execMerge()).toBe(" ~~[*babelfish*](https://github.com/nodeca/babelfish/)~~")
  })
})
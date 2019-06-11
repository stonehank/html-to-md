import Code from '../../src/tags/code'


describe('test <code></code> tag',()=>{
  it('has textNode',()=>{
    let code=new Code("<code>javascript</code>")
    expect(code.execMerge()).toBe("`javascript`")
  })

  it('tag inside should be textNode',()=>{
    let code=new Code("<code><span>dfaf</span><a href=\"https://github.com/nodeca/babelfish/\"><i>babelfish</i></a></code>")
    expect(code.execMerge()).toBe("`<span>dfaf</span><a href=\"https://github.com/nodeca/babelfish/\"><i>babelfish</i></a>`")
  })
})
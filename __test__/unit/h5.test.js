const H5=require( '../../src/tags/h5')


describe('test <h5></h5> tag',()=>{
  it('no nest',()=>{
    let h5=new H5("<h5>javascript</h5>")
    expect(h5.execMerge()).toBe("\n##### javascript\n")
  })

  it('can nest',()=>{
    let h5=new H5("<h5><strong><i>strong and italic</i></strong></h5>")
    expect(h5.execMerge()).toBe("\n##### ***strong and italic***\n")
  })

  it('can nest-2',()=>{
    let h5=new H5("<h5 class=\"line\" data-line=\"174\"><a href=\"https://github.com/markdown-it/markdown-it-sub\">Subscript</a> / <a href=\"https://github.com/markdown-it/markdown-it-sup\">Superscript</a></h5>")
    expect(h5.execMerge()).toBe("\n" +
      "##### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)\n")
  })
})
import P from '../../src/tags/p'

describe('Remove some space',()=>{


  it('The space between tags should be remove',()=>{
    let spaceHtml=new P("<p>       <strong>strong</strong></p>")
    expect(spaceHtml.execMerge()).toBe("\n" +
      " **strong**\n")
  })
})

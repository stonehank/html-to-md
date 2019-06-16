import Ul from '../../src/tags/ul'
import Ol from "../../src/tags/ol";
const {tagSpaceNum}=require('../options')

describe("test <ul></ul> tag",()=>{

  it('unorder list',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'one\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'two\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'three\n')
  })

  it('nest ul',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<ul>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'one\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'two\n' +
      ' '.repeat(tagSpaceNum)+'* '+' '.repeat(tagSpaceNum-2)+'one\n' +
      ' '.repeat(tagSpaceNum)+'* '+' '.repeat(tagSpaceNum-2)+'two\n' +
      ' '.repeat(tagSpaceNum)+'* '+' '.repeat(tagSpaceNum-2)+'three\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'three\n')
  })


  it('nest ol',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<ol>\n' +
      '<li>unorder-1</li>\n' +
      '<li>unorder-2</li>\n' +
      '<li>unorder-3</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'one\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'two\n' +
      ' '.repeat(tagSpaceNum)+'1.'+' '.repeat(tagSpaceNum-2)+'unorder-1\n' +
      ' '.repeat(tagSpaceNum)+'2.'+' '.repeat(tagSpaceNum-2)+'unorder-2\n' +
      ' '.repeat(tagSpaceNum)+'3.'+' '.repeat(tagSpaceNum-2)+'unorder-3\n' +
      '* '+' '.repeat(tagSpaceNum-2)+'three\n')
  })

  it('complicate nest',()=>{
    let ul=new Ul('<ul>\n' +
      '<li><strong>STRONG</strong></li>\n' +
      '<li><a href="https://github.com/-it/markdown-it-sub">ATag</a>\n' +
      '<ol>\n' +
      '<li>unorder-1</li>\n' +
      '<li>unorder-2\n' +
      '<ul>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<blockquote>\n' +
      '<ol>\n' +
      '<li>bq-nest-1</li>\n' +
      '</ol>\n' +
      '<blockquote>\n' +
      '<ol>\n' +
      '<li>bq-nest-2</li>\n' +
      '</ol>\n' +
      '<blockquote>\n' +
      '<ol>\n' +
      '<li>bq-nest-3</li>\n' +
      '</ol>\n' +
      '</blockquote>\n' +
      '</blockquote>\n' +
      '</blockquote>\n' +
      '</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '<li>unorder-3\n' +
      '<ol>\n' +
      '<li>code<pre class="hljs language-javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{\n' +
      '    <span class="hljs-keyword">let</span> b=<span class="hljs-number">5</span>\n' +
      '    <span class="hljs-keyword">let</span> obj={\n' +
      '            <span class="hljs-attr">x</span>:<span class="hljs-number">100</span>\n' +
      '        }\n' +
      '    <span class="hljs-keyword">return</span> obj.x+b\n' +
      '}\n' +
      '</code></pre>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.execMerge()).toBe('\n' +
      '*  **STRONG**\n' +
      '*  [ATag](https://github.com/-it/markdown-it-sub)\n' +
      '   1. unorder-1\n' +
      '   2. unorder-2\n' +
      '      *  one\n' +
      '      *  two\n' +
      '         >1. bq-nest-1\n' +
      '         >\n' +
      '         >>1. bq-nest-2\n' +
      '         >>\n' +
      '         >>>1. bq-nest-3\n' +
      '   3. unorder-3\n' +
      '      1. code\n' +
      '         ```javascript\n' +
      '         function a(){\n' +
      '             let b=5\n' +
      '             let obj={\n' +
      '                     x:100\n' +
      '                 }\n' +
      '             return obj.x+b\n' +
      '         }\n' +
      '         ```\n' +
      '*  three\n')
  })

  it("li nest p",()=>{
    let ul=new Ul("<ul>\n" +
      "<li>\n" +
      "<p>Lorem ipsum dolor sit amet</p></li>\n" +
      "<li><p>Consectetur adipiscing elit</p>\n" +
      "</li>\n" +
      "<li><p>Integer molestie lorem at massa</p></li>\n" +
      "<li>\n" +
      "<p>You can use sequential numbers…</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>…or keep all the numbers as <code>1.</code></p>\n" +
      "</li>\n" +
      "</ul>")

    expect(ul.execMerge()).toBe('\n' +
      '*  Lorem ipsum dolor sit amet\n' +
      '\n' +
      '*  Consectetur adipiscing elit\n' +
      '\n' +
      '*  Integer molestie lorem at massa\n' +
      '\n' +
      '*  You can use sequential numbers…\n' +
      '\n' +
      '*  …or keep all the numbers as `1.`\n')
  })

  it("text in li",()=>{
    let ul=new Ul("<ul>\n" +
      "<li>Lorem ipsum dolor sit amet\n" +
      "</li>\n" +
      "<li>\n" +
      "Consectetur adipiscing elit</li>\n" +
      "<li>Integer molestie lorem at massa</li>\n" +
      "<li>\n" +
      "You can use sequential numbers…\n" +
      "</li>\n" +
      "<li>\n" +
      "…or keep all the numbers as <code>1.</code>\n" +
      "</li>\n" +
      "</ul>")

    expect(ul.execMerge()).toBe('\n' +
      '*  Lorem ipsum dolor sit amet\n' +
      '*  Consectetur adipiscing elit\n' +
      '*  Integer molestie lorem at massa\n' +
      '*  You can use sequential numbers…\n' +
      '*  …or keep all the numbers as `1.`\n')
  })

  it("todo list",()=>{
    let ul=new Ul('<ul>\n' +
      '<li><input disabled="" type="checkbox"> not finish-1</li>\n' +
      '<li><input disabled="" type="checkbox"> not finish-2</li>\n' +
      '<li><input disabled="" type="checkbox"> not finish-3</li>\n' +
      '<li><input disabled="" type="checkbox"> not finish-4</li>\n' +
      '</ul>')

    expect(ul.execMerge()).toBe('\n' +
      '*  [ ]  not finish-1\n' +
      '*  [ ]  not finish-2\n' +
      '*  [ ]  not finish-3\n' +
      '*  [ ]  not finish-4\n')
  })

  it("done list",()=>{
    let ul=new Ul('<ul>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-1</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-2</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-3</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-4</li>\n' +
      '</ul>')

    expect(ul.execMerge()).toBe('\n' +
      '*  [x]  finish-1\n' +
      '*  [x]  finish-2\n' +
      '*  [x]  finish-3\n' +
      '*  [x]  finish-4\n')
  })
})


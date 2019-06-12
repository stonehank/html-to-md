import Ol from '../../src/tags/ol'

describe("test <ol></ol> tag",()=>{

  it('order list',()=>{
    let ol=new Ol('<ol>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ol>')
    expect(ol.execMerge()).toBe('\n1. one\n' +
      '2. two\n' +
      '3. three\n')
  })

  it('nest order list',()=>{
    let ol=new Ol('<ol>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<ol>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ol>')
    expect(ol.execMerge()).toBe('\n' +
      '1. one\n' +
      '2. two\n' +
      '    1. one\n' +
      '    2. two\n' +
      '    3. three\n' +
      '3. three\n')
  })


  it('nest ul',()=>{
    let ol=new Ol('<ol>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<ul>\n' +
      '<li>unorder-1</li>\n' +
      '<li>unorder-2</li>\n' +
      '<li>unorder-3</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ol>')
    expect(ol.execMerge()).toBe('\n' +
      '1. one\n' +
      '2. two\n' +
      '    * unorder-1\n' +
      '    * unorder-2\n' +
      '    * unorder-3\n' +
      '3. three\n')
  })

  it('complicate nest',()=>{
    let ol=new Ol('<ol>\n' +
      '<li><strong>STRONG</strong></li>\n' +
      '<li><a href="https://github.com/-it/markdown-it-sub">ATag</a>\n' +
      '<ul>\n' +
      '<li>unorder-1</li>\n' +
      '<li>unorder-2\n' +
      '<ol>\n' +
      '<li>one</li>\n' +
      '<li>two\n' +
      '<blockquote>\n' +
      '<ul>\n' +
      '<li>bq-nest-1</li>\n' +
      '</ul>\n' +
      '<blockquote>\n' +
      '<ul>\n' +
      '<li>bq-nest-2</li>\n' +
      '</ul>\n' +
      '<blockquote>\n' +
      '<ul>\n' +
      '<li>bq-nest-3</li>\n' +
      '</ul>\n' +
      '</blockquote>\n' +
      '</blockquote>\n' +
      '</blockquote>\n' +
      '</li>\n' +
      '</ol>\n' +
      '</li>\n' +
      '<li>unorder-3\n' +
      '<ul>\n' +
      '<li>code<pre class="hljs language-js"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span>\n' +
      '</code></pre>\n' +
      '</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '</ul>\n' +
      '</li>\n' +
      '<li>three</li>\n' +
      '</ol>')
    expect(ol.execMerge()).toBe('\n' +
      '1. **STRONG**\n' +
      '2. [ATag](https://github.com/-it/markdown-it-sub)\n' +
      '    * unorder-1\n' +
      '    * unorder-2\n' +
      '        1. one\n' +
      '        2. two\n' +
      '            >* bq-nest-1\n' +
      '            >>* bq-nest-2\n' +
      '            >>>* bq-nest-3\n' +
      '    * unorder-3\n' +
      '        * code\n' +
      '            ```js\n' +
      '            var a=5\n' +
      '            ```\n' +
      '3. three\n')
  })


  it("li nest p",()=>{
    let ol=new Ol("<ol>\n" +
      "<li>\n" +
      "<p>Lorem ipsum dolor sit amet</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>Consectetur adipiscing elit</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>Integer molestie lorem at massa</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>You can use sequential numbers…</p>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>…or keep all the numbers as <code>1.</code></p>\n" +
      "</li>\n" +
      "</ol>")

    expect(ol.execMerge()).toBe("\n" +
      "1. Lorem ipsum dolor sit amet\n" +
      "2. Consectetur adipiscing elit\n" +
      "3. Integer molestie lorem at massa\n" +
      "4. You can use sequential numbers…\n" +
      "5. …or keep all the numbers as `1.`\n")
  })
})


import Ol from '../../src/tags/ol'
const {tagSpaceNum}=require('../options')

describe("test <ol></ol> tag",()=>{

  it('order list',()=>{
    let ol=new Ol('<ol>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ol>')
    expect(ol.exec()).toBe('\n1.'+' '.repeat(tagSpaceNum-2)+'one\n' +
      '2.'+' '.repeat(tagSpaceNum-2)+'two\n' +
      '3.'+' '.repeat(tagSpaceNum-2)+'three\n')
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
    expect(ol.exec()).toBe('\n' +
      '1.'+' '.repeat(tagSpaceNum-2)+'one\n' +
      '2.'+ ' '.repeat(tagSpaceNum-2)+'two\n' +
      ' '.repeat(tagSpaceNum)+ '1.'+' '.repeat(tagSpaceNum-2)+'one\n' +
      ' '.repeat(tagSpaceNum)+ '2.'+' '.repeat(tagSpaceNum-2)+'two\n' +
      ' '.repeat(tagSpaceNum)+ '3.'+' '.repeat(tagSpaceNum-2)+'three\n' +
      '3.'+ ' '.repeat(tagSpaceNum-2)+ 'three\n')
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
    expect(ol.exec()).toBe('\n' +
      '1.'+' '.repeat(tagSpaceNum-2)+'one\n' +
      '2.'+' '.repeat(tagSpaceNum-2)+'two\n' +
      ' '.repeat(tagSpaceNum)+ '* '+' '.repeat(tagSpaceNum-2)+'unorder-1\n' +
      ' '.repeat(tagSpaceNum)+ '* '+' '.repeat(tagSpaceNum-2)+'unorder-2\n' +
      ' '.repeat(tagSpaceNum)+ '* '+' '.repeat(tagSpaceNum-2)+'unorder-3\n' +
      '3.'+' '.repeat(tagSpaceNum-2)+'three\n')
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
    expect(ol.exec()).toBe('\n' +
      '1.'+' '.repeat(tagSpaceNum-2)+ '**STRONG**\n' +
      '2.'+' '.repeat(tagSpaceNum-2)+ '[ATag](https://github.com/-it/markdown-it-sub)\n' +
      ' '.repeat(tagSpaceNum)+'*'+' '.repeat(tagSpaceNum-1)+ 'unorder-1\n' +
      ' '.repeat(tagSpaceNum)+'*'+' '.repeat(tagSpaceNum-1)+ 'unorder-2\n' +
      ' '.repeat(tagSpaceNum*2)+'1.'+' '.repeat(tagSpaceNum-2)+ 'one\n' +
      ' '.repeat(tagSpaceNum*2)+'2.'+' '.repeat(tagSpaceNum-2)+ 'two\n' +
      ' '.repeat(tagSpaceNum*3)+'> *'+' '.repeat(tagSpaceNum-1)+ 'bq-nest-1\n' +
      ' '.repeat(tagSpaceNum*3)+'>\n' +
      ' '.repeat(tagSpaceNum*3)+'>> *'+' '.repeat(tagSpaceNum-1)+ 'bq-nest-2\n' +
      ' '.repeat(tagSpaceNum*3)+'>>\n' +
      ' '.repeat(tagSpaceNum*3)+'>>> *'+' '.repeat(tagSpaceNum-1)+ 'bq-nest-3\n' +
      ' '.repeat(tagSpaceNum)+'*'+' '.repeat(tagSpaceNum-1)+ 'unorder-3\n' +
      ' '.repeat(tagSpaceNum*2)+'*'+' '.repeat(tagSpaceNum-1)+ 'code\n' +
      ' '.repeat(tagSpaceNum*3)+'```javascript\n' +
      ' '.repeat(tagSpaceNum*3)+'var a=5\n' +
      ' '.repeat(tagSpaceNum*3)+'```\n' +
      '3.'+' '.repeat(tagSpaceNum-2)+ 'three\n')
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

    expect(ol.exec()).toBe('\n' +
      '1.'+' '.repeat(tagSpaceNum-2)+ 'Lorem ipsum dolor sit amet\n' +
      '\n' +
      '2.'+' '.repeat(tagSpaceNum-2)+ 'Consectetur adipiscing elit\n' +
      '\n' +
      '3.'+' '.repeat(tagSpaceNum-2)+ 'Integer molestie lorem at massa\n' +
      '\n' +
      '4.'+' '.repeat(tagSpaceNum-2)+ 'You can use sequential numbers…\n' +
      '\n' +
      '5.'+' '.repeat(tagSpaceNum-2)+ '…or keep all the numbers as `1.`\n')
  })
})


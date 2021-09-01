import Ul from '../../src/tags/ul'
const {tagSpaceNum}=require('../options')

describe("test <ul></ul> tag",()=>{

  it('unorder list',()=>{
    let ul=new Ul('<ul>\n' +
      '<li>one</li>\n' +
      '<li>two</li>\n' +
      '<li>three</li>\n' +
      '</ul>')
    expect(ul.exec()).toBe('\n' +
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
    expect(ul.exec()).toBe('\n' +
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
    expect(ul.exec()).toBe('\n' +
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
    expect(ul.exec()).toBe('\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'**STRONG**\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[ATag](https://github.com/-it/markdown-it-sub)\n' +
      ' '.repeat(tagSpaceNum)+'1.'+' '.repeat(tagSpaceNum-2)+'unorder-1\n' +
      ' '.repeat(tagSpaceNum)+'2.'+' '.repeat(tagSpaceNum-2)+'unorder-2\n' +
      ' '.repeat(tagSpaceNum*2)+'*'+' '.repeat(tagSpaceNum-1)+'one\n' +
      ' '.repeat(tagSpaceNum*2)+'*'+' '.repeat(tagSpaceNum-1)+'two\n' +
      ' '.repeat(tagSpaceNum*3)+'> 1.'+' '.repeat(tagSpaceNum-2)+'bq-nest-1\n' +
      ' '.repeat(tagSpaceNum*3)+'>\n' +
      ' '.repeat(tagSpaceNum*3)+'>> 1.'+' '.repeat(tagSpaceNum-2)+'bq-nest-2\n' +
      ' '.repeat(tagSpaceNum*3)+'>>\n' +
      ' '.repeat(tagSpaceNum*3)+'>>> 1.'+' '.repeat(tagSpaceNum-2)+'bq-nest-3\n' +
      ' '.repeat(tagSpaceNum)+'3.'+' '.repeat(tagSpaceNum-2)+'unorder-3\n' +
      ' '.repeat(tagSpaceNum*2)+'1.'+' '.repeat(tagSpaceNum-2)+'code\n' +
      ' '.repeat(tagSpaceNum*3)+'```javascript\n' +
      ' '.repeat(tagSpaceNum*3)+'function a(){\n' +
      ' '.repeat(tagSpaceNum*3)+'    let b=5\n' +
      ' '.repeat(tagSpaceNum*3)+'    let obj={\n' +
      ' '.repeat(tagSpaceNum*3)+'            x:100\n' +
      ' '.repeat(tagSpaceNum*3)+'        }\n' +
      ' '.repeat(tagSpaceNum*3)+'    return obj.x+b\n' +
      ' '.repeat(tagSpaceNum*3)+'}\n' +
      ' '.repeat(tagSpaceNum*3)+'```\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'three\n')
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

    expect(ul.exec()).toBe('\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'Lorem ipsum dolor sit amet\n' +
      '\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'Consectetur adipiscing elit\n' +
      '\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'Integer molestie lorem at massa\n' +
      '\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'You can use sequential numbers…\n' +
      '\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'…or keep all the numbers as `1.`\n')
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

    expect(ul.exec()).toBe('\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'Lorem ipsum dolor sit amet\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'Consectetur adipiscing elit\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'Integer molestie lorem at massa\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'You can use sequential numbers…\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'…or keep all the numbers as `1.`\n')
  })

  it("todo list",()=>{
    let ul=new Ul('<ul>\n' +
      '<li><input disabled="" type="checkbox"> not finish-1</li>\n' +
      '<li><input disabled="" type="checkbox"> not finish-2</li>\n' +
      '<li><input disabled="" type="checkbox"> not finish-3</li>\n' +
      '<li><input disabled="" type="checkbox"> not finish-4</li>\n' +
      '</ul>')

    expect(ul.exec()).toBe('\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[ ]  not finish-1\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[ ]  not finish-2\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[ ]  not finish-3\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[ ]  not finish-4\n')
  })

  it("done list",()=>{
    let ul=new Ul('<ul>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-1</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-2</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-3</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> finish-4</li>\n' +
      '</ul>')

    expect(ul.exec()).toBe('\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[x]  finish-1\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[x]  finish-2\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[x]  finish-3\n' +
      '*'+' '.repeat(tagSpaceNum-1)+'[x]  finish-4\n')
  })

  it("test <br>",()=>{
    let ul=new Ul('<ul>\n' +
        '<li><strong>参数replace</strong><br>\n' +
        '用来设置是否可以取相同元素：<br>\n' +
        'True表示可以取相同数字；<br>\n' +
        'False表示不可以取相同数字。<br>\n' +
        '默认是True</li>\n' +
        '</ul>')

    expect(ul.exec()).toBe(
`
*   **参数replace**  
    用来设置是否可以取相同元素：  
    True表示可以取相同数字；  
    False表示不可以取相同数字。  
    默认是True
`
    )
  })

  it("test <br> 2",()=>{
    let ul=new Ul('<ul>\n' +
        '<li><strong>参数replace</strong><br>\n' +
        '用来设置是否可以取相同元素：<br>\n' +
        'True表示可以取相同数字；<br>\n' +
        '<ul>\n' +
        '<li><strong>nest参数replace</strong><br>\n' +
        'nest用来设置是否可以取相同元素：<br>\n' +
        'nestTrue表示可以取相同数字；<br>\n' +
        'nestFalse表示不可以取相同数字。<br>\n' +
        'nest默认是True</li>\n' +
        '</ul>' +
        '默认是True</li>\n' +
        '</ul>')

    expect(ul.exec()).toBe(`
*   **参数replace**  
    用来设置是否可以取相同元素：  
    True表示可以取相同数字；  

    *   **nest参数replace**  
        nest用来设置是否可以取相同元素：  
        nestTrue表示可以取相同数字；  
        nestFalse表示不可以取相同数字。  
        nest默认是True

    默认是True
`)
  })


  it("nest ul-2",()=>{
    let ul=new Ul(`<ul>
<li>Create a list by starting a line with <code>+</code>, <code>-</code>, or <code>*</code></li>
<li>Sub-lists are made by indenting 2 spaces:
<ul>
<li>Marker character change forces new list start:
<ul>
<li>Ac tristique libero volutpat at</li>
</ul>
<ul>
<li>Facilisis in pretium nisl aliquet</li>
</ul>
<ul>
<li>Nulla volutpat aliquam velit</li>
</ul>
</li>
</ul>
</li>
<li>Very easy!</li>
</ul>`)

    expect(ul.exec()).toBe(`
*   Create a list by starting a line with \`+\`, \`-\`, or \`*\`
*   Sub-lists are made by indenting 2 spaces:
    *   Marker character change forces new list start:
        *   Ac tristique libero volutpat at


        *   Facilisis in pretium nisl aliquet


        *   Nulla volutpat aliquam velit
*   Very easy!
`)
  })
})


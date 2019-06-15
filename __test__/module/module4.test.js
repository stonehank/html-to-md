const html2Md=require('../../src/index')

describe('test special',()=>{

  it('test-1',()=>{
    let str="<body"
    expect(html2Md(str)).toBe("<body></body>")
  })

  it('test-2',()=>{
    let str="<!DOCTYPE><html><body><i>abc<b>xxx</b></i></body></html>"
    expect(html2Md(str)).toBe("<html><body>*abc**xxx***</body></html>")
  })

  it('test-3',()=>{
    let str="<pre class=\"hljs language-md\"><code><span class=\"hljs-bullet\"> - </span>foo\n" +
      "<span class=\"hljs-bullet\">\n" +
      " - </span>bar\n" +
      "<span class=\"hljs-bullet\"> - </span>baz\n" +
      "</code></pre>"
    expect(html2Md(str)).toBe('\n' +
      '```markdown\n' +
      ' - foo\n' +
      '\n' +
      ' - bar\n' +
      ' - baz\n' +
      '```\n')
  })

  //
  // it('pre code and p',()=>{
  //   let str='<ul>\n' +
  //     '<li>\n' +
  //     '<p><strong>Since version 1.4.0, showdown supports the markdown="1" attribute</strong>, but for older versions, this attribute is ignored. This means:</p>\n' +
  //     '<pre><code>  &lt;div markdown="1"&gt;\n' +
  //     '       Markdown does *not* work in here.\n' +
  //     '  &lt;/div&gt;\n' +
  //     '</code></pre>\n' +
  //     '</li>\n' +
  //     '<li>\n' +
  //     '<p>You can only nest square brackets in link titles to a depth of two levels:</p>\n' +
  //     '<pre><code>  [[fine]](http://www.github.com/)\n' +
  //     '  [[[broken]]](http://www.github.com/)\n' +
  //     '</code></pre>\n' +
  //     '<p>If you need more, you can escape them with backslashes.</p>\n' +
  //     '</li>\n' +
  //     '<li>\n' +
  //     '<p>A list is <strong>single paragraph</strong> if it has only <strong>1 line-break separating items</strong> and it becomes <strong>multi paragraph if ANY of its items is separated by 2 line-breaks</strong>:</p>\n' +
  //     '<pre class="hljs language-md"><code><span class="hljs-bullet"> - </span>foo\n' +
  //     '<span class="hljs-bullet">\n' +
  //     ' - </span>bar\n' +
  //     '<span class="hljs-bullet"> - </span>baz\n' +
  //     '</code></pre>\n' +
  //     '<p>becomes</p>\n' +
  //     '<pre class="hljs language-html"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>\n' +
  //     '  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>\n' +
  //     '  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>bar<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>\n' +
  //     '  <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>baz<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>\n' +
  //     '<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>\n' +
  //     '</code></pre>\n' +
  //     '</li>\n' +
  //     '</ul>'
  //   expect(html2Md(str)).toBe()
  // })


  it('li child has p',()=>{
    let str="<ul>\n" +
      "<li>\n" +
      "<p>rawgit CDN</p>\n" +
      "<pre><code>  https://cdn.rawgit.com/showdownjs/showdown/&lt;version tag&gt;/dist/showdown.min.js\n" +
      "</code></pre>\n" +
      "</li>\n" +
      "<li>\n" +
      "<p>cdnjs</p>\n" +
      "<pre><code>  https://cdnjs.cloudflare.com/ajax/libs/showdown/&lt;version tag&gt;/showdown.min.js\n" +
      "</code></pre>\n" +
      "</li>\n" +
      "</ul>"
    expect(html2Md(str)).toBe('\n' +
      '* rawgit CDN\n' +
      '    ```\n' +
      '      https://cdn.rawgit.com/showdownjs/showdown/<version tag>/dist/showdown.min.js\n' +
      '    ```\n' +
      '\n' +
      '* cdnjs\n' +
      '    ```\n' +
      '      https://cdnjs.cloudflare.com/ajax/libs/showdown/<version tag>/showdown.min.js\n' +
      '    ```\n')
  })


})

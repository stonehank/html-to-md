import Pre from '../../src/tags/pre'


describe('test <pre></pre> tag',()=>{

  it('no language, childNode should be textNode-1',()=>{
    let pre=new Pre('<pre class="hljs"><code>"somthing" speaking\n' +
      '</code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```\n' +
      '"somthing" speaking\n' +
      '```\n')
  })

  it('no language, childNode should be textNode-2',()=>{
    let pre=new Pre("<pre class=\"hljs\"><code>&lt;span class=\"hljs-number\"&gt;5&lt;/span&gt;</code></pre>")
    expect(pre.execMerge()).toBe('\n' +
      '```\n' +
      '<span class="hljs-number">5</span>\n' +
      '```\n')
  })


  it('no language, childNode should be textNode-3, remain format',()=>{
    let pre=new Pre('<pre class="hljs"><code>&lt;span class="hljs-number"&gt;\n  5\n&lt;/span&gt;\n</code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```\n' +
      '<span class="hljs-number">\n' +
      '  5\n' +
      '</span>\n' +
      '```\n')
  })

  it('has language, span should be parse, should add language',()=>{
    let pre=new Pre('<pre class="hljs language-js"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">abc</span>(<span class="hljs-params"></span>)</span>{\n' +
      '  <span class="hljs-keyword">let</span> x=<span class="hljs-number">5</span>\n' +
      '}\n' +
      '</code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```javascript\n' +
      'function abc(){\n' +
      '  let x=5\n' +
      '}\n```\n')
  })

  it('has language, span should be parse, should add language-2',()=>{
    let pre=new Pre('<pre class="hljs language-javascript"><code>&lt;span&gt;<span class="hljs-keyword">var</span>&lt;<span class="hljs-regexp">/span&gt;\n' +
      'function abc(){\n' +
      '  let x=5\n' +
      '}\n' +
      '</span></code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```javascript\n' +
      '<span>var</span>\n' +
      'function abc(){\n' +
      '  let x=5\n' +
      '}\n' +
      '```\n')
  })
})
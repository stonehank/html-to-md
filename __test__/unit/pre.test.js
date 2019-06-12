import Pre from '../../src/tags/pre'


describe('test <pre></pre> tag',()=>{

  it('no language',()=>{
    let pre=new Pre( "<pre><code>// Some comments\n" +
      "line 1 of code\n" +
      "line 2 of code\n" +
      "line 3 of code\n" +
      "</code></pre>\n")
    expect(pre.execMerge()).toBe('\n' +
      '```\n' +
      '// Some comments\n' +
      'line 1 of code\n' +
      'line 2 of code\n' +
      'line 3 of code\n' +
      '```\n')
  })

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

  it('default language is javascript',()=>{
    let pre=new Pre('<pre><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">abc</span>(<span class="hljs-params"></span>)</span>{\n' +
      '  <span class="hljs-keyword">let</span> x=<span class="hljs-number">5</span>\n' +
      '}\n' +
      '</code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```javascript\n' +
      'function abc(){\n' +
      '  let x=5\n' +
      '}\n```\n')
  })


  it('has language, span should be parse, should add language:js',()=>{
    let pre=new Pre('<pre class="hljs language-js"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">abc</span>(<span class="hljs-params"></span>)</span>{\n' +
      '  <span class="hljs-keyword">let</span> x=<span class="hljs-number">5</span>\n' +
      '}\n' +
      '</code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```js\n' +
      'function abc(){\n' +
      '  let x=5\n' +
      '}\n```\n')
  })
  it('has language, span should be parse, should add language:java',()=>{
    let pre=new Pre('<pre class="hljs language-java"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">abc</span>(<span class="hljs-params"></span>)</span>{\n' +
      '  <span class="hljs-keyword">let</span> x=<span class="hljs-number">5</span>\n' +
      '}\n' +
      '</code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```java\n' +
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

  it('text outside code',()=>{
    let pre=new Pre("<pre><strong>输入：</strong>N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]\n<strong>输出：</strong>[1,0]\n<strong>解释： </strong>\n在执行第一次查询之前，我们位于 [0, 0] 和 [4, 4] 灯是亮着的。\n表示哪些单元格亮起的网格如下所示，其中 [0, 0] 位于左上角：\n1 1 1 1 1\n1 1 0 0 1\n1 0 1 0 1\n1 0 0 1 1\n1 1 1 1 1\n然后，由于单元格 [1, 1] 亮着，第一次查询返回 1。在此查询后，位于 [0，0] 处的灯将关闭，网格现在如下所示：\n1 0 0 0 1\n0 1 0 0 1\n0 0 1 0 1\n0 0 0 1 1\n1 1 1 1 1\n在执行第二次查询之前，我们只有 [4, 4] 处的灯亮着。现在，[1, 0] 处的查询返回 0，因为该单元格不再亮着。\n</pre>")
    expect(pre.execMerge()).toBe('\n' +
      '```\n' +
      '输入：N = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]\n' +
      '输出：[1,0]\n' +
      '解释： \n' +
      '在执行第一次查询之前，我们位于 [0, 0] 和 [4, 4] 灯是亮着的。\n' +
      '表示哪些单元格亮起的网格如下所示，其中 [0, 0] 位于左上角：\n' +
      '1 1 1 1 1\n' +
      '1 1 0 0 1\n' +
      '1 0 1 0 1\n' +
      '1 0 0 1 1\n' +
      '1 1 1 1 1\n' +
      '然后，由于单元格 [1, 1] 亮着，第一次查询返回 1。在此查询后，位于 [0，0] 处的灯将关闭，网格现在如下所示：\n' +
      '1 0 0 0 1\n' +
      '0 1 0 0 1\n' +
      '0 0 1 0 1\n' +
      '0 0 0 1 1\n' +
      '1 1 1 1 1\n' +
      '在执行第二次查询之前，我们只有 [4, 4] 处的灯亮着。现在，[1, 0] 处的查询返回 0，因为该单元格不再亮着。\n' +
      '```\n')
  })

  it('pre nest pre',()=>{
    let pre=new Pre('<pre><code class="language-js"><pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre></code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```js\n' +
      'var a=5\n' +
      '```\n')
  })

  it('pre nest pre 2',()=>{
    let pre=new Pre('<pre><code class="language-java"><pre class="hljs"><code><span class="hljs-function">def <span class="hljs-title">a</span><span class="hljs-params">()</span>:\n' +
      '  return 6</span></code></pre></code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```java\n' +
      'def a():\n' +
      '  return 6\n' +
      '```\n')
  })

  it('multi nest pre',()=>{
    let pre=new Pre('<pre><code class="language-js"><pre class="hljs"><code><pre><code class="language-js"><pre><code class="language-js"><pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre></code></pre><pre class="hljs"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre></code></pre><span class="hljs-keyword">var</span> a=<span class="hljs-number">5</span></code></pre></code></pre>')
    expect(pre.execMerge()).toBe('\n' +
      '```js\n' +
      'var a=5\n' +
      'var a=5\n' +
      'var a=5\n' +
      '```\n')
  })
})
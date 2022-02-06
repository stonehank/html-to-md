const PAGE1HTML = '<div class="infoWrap">\n' +
    '        <span class="info">markdown</span>\n' +
    '        <span class="info">\n' +
    '        <span style="font-size:0.8rem">转换工具选择👉</span>\n' +
    '        <select id="chooseM2H">\n' +
    '            <option value="markdown-it">markdown-it</option>\n' +
    '            <option value="marked">marked</option>\n' +
    '        </select>\n' +
    '    </span>\n' +
    '        <span class="info">html</span>\n' +
    '        <span class="info">\n' +
    '        <span>👉</span>\n' +
    '        <select disabled>\n' +
    '            <option value="html-to-md">html-to-md</option>\n' +
    '        </select>\n' +
    '    </span>\n' +
    '        <span class="info">markdown</span>\n' +
    '    </div>\n' +
    '    <div id="wrap" class="markdown-body page-selected-0">\n' +
    '        <textarea id="inputMD" class="io"></textarea>\n' +
    '        <div id="outputHTML" class="io" ></div>\n' +
    '        <textarea id="outputMD" readonly class="io"></textarea>\n' +
    '    </div>'

const PAGE2HTML = '<div class="infoWrap">\n' +
    '        <span class="info">html</span>\n' +
    '        <span class="info">\n' +
    '        <span>👉</span>\n' +
    '        <select disabled>\n' +
    '            <option value="html-to-md">html-to-md</option>\n' +
    '        </select>\n' +
    '    </span>\n' +
    '        <span class="info">markdown</span>\n' +
    '    </div>\n' +
    '    <div id="wrap" class="markdown-body ">\n' +
    '        <textarea id="inputHTML" class="io" ></textarea>\n' +
    '        <textarea id="outputMD" readonly class="io"></textarea>\n' +
    '    </div>'


const PLACEHOLDER='---\n' +
    '\n' +
    '# h1 Heading\n' +
    '## h2 Heading\n' +
    '### h3 Heading\n' +
    '#### h4 Heading\n' +
    '\n' +
    '\n' +
    '\n' +
    '## Emphasis\n' +
    '\n' +
    '**This is bold text**\n' +
    '\n' +
    '*This is italic text*\n' +
    '\n' +
    '~~Strikethrough~~\n' +
    '\n' +
    '\n' +
    '## Blockquotes\n' +
    '\n' +
    '> Blockquotes can also be nested...\n' +
    '>> ...by using additional greater-than signs right next to each other...\n' +
    '\n' +
    '\n' +
    '### Blockquote list\n' +
    '\n' +
    '> * list1\n' +
    '> * list2\n' +
    '\n' +
    '\n' +
    '## Lists\n' +
    'Ordered\n' +
    '\n' +
    '1. Lorem ipsum dolor sit amet\n' +
    '2. Consectetur adipiscing elit\n' +
    '3. Integer molestie lorem at massa\n' +
    '1. You can use sequential numbers...\n' +
    '\n' +
    'Start numbering with offset:\n' +
    '\n' +
    '57. foo\n' +
    '1. bar\n' +
    '\n' +
    'Syntax highlighting\n' +
    '\n' +
    '``` js\n' +
    'var foo = function (bar) {\n' +
    '  return bar++;\n' +
    '};\n' +
    '\n' +
    'console.log(foo(5));\n' +
    '```\n' +
    '\n' +
    '\n' +
    '## Tables\n' +
    '\n' +
    '| Option | Description |\n' +
    '| ------ | ----------- |\n' +
    '| data   | path to data files to supply the data that will be passed into templates. |\n' +
    '| engine | engine to be used for processing templates. Handlebars is the default. |\n' +
    '| ext    | extension to be used for dest files. |\n' +
    '\n' +
    '## Todo list\n' +
    '\n' +
    '- [ ] not finish-1\n' +
    '\n' +
    '## Done list\n' +
    '\n' +
    '- [x] finish-1\n'

const PLACEHOLDER2 =
    `<h1>h1 Heading</h1>

<hr>

<h2>Emphasis</h2>
<p><em><strong>Bold and italic</strong></em></p>
<p><strong>This is bold text</strong></p>

<h2>Tables</h2>
<table>
<thead>
<tr><th>Option</th><th>Description</th></tr>
</thead>
<tbody>
<tr><td>data</td><td>path to data files to supply the data that will be passed into templates.</td></tr>
<tr><td>engine</td><td>engine to be used for processing templates. Handlebars is the default.</td></tr>
<tr><td>ext</td><td>extension to be used for dest files.</td></tr>
</tbody>
</table>

<ul>
<li><input checked="" disabled="" type="checkbox"> finish-1</li>
<li><input checked="" disabled="" type="checkbox"> finish-2</li>
<li><input checked="" disabled="" type="checkbox"> finish-3</li>
</ul>
`

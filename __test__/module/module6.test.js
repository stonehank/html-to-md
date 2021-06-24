const html2Md=require('../../src/index')
describe('some correction',()=>{

    it('Default no ignore svg',()=>{
        let str='<svg>\n' +
            '<path></path>\n' +
            ' </svg>'
        expect(html2Md(str)).toBe('')
    })

    it('Need to escape 1',()=>{
        let str='<p><strong>* 一个标题</strong></p>'
        expect(html2Md(str)).toBe('**\\* 一个标题**\n')
    })

    it('Need to escape 2',()=>{
        let str='<p><b>* 一个标题<i>- 第二个标题</i></b></p>'
        expect(html2Md(str)).toBe('**\\* 一个标题*\\- 第二个标题***\n')
    })
    it('Need to escape 3',()=>{
        let str='<p>**一个标题**<i>-- 第二个标题</i></p>'
        expect(html2Md(str)).toBe('\\*\\*一个标题\\*\\**\\-- 第二个标题*\n')
    })
})

import html2Md from '../../src/index'

describe('Get the correct escape & unescape',()=>{

    it(`unescape the "'"`,()=>{
        expect(html2Md('<p>it&apos;s</p>')).toBe("it's")
    })
  
})

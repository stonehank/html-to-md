const html2Md=require('../../src/index')
const {tagSpaceNum}=require('../options')

describe("test <blockquote></blockquote> tag",()=>{

  it('no nest',()=>{
    let blockquote=html2Md("<blockquote>\n" +
      "<p>This is <strong>quote</strong>…</p>\n" +
      "</blockquote>")
    expect(blockquote).toBe(
      "> This is **quote**…")
  })


  it('nest ul',()=>{
    let blockquote=html2Md("<blockquote>\n" +
      "<ul>\n" +
      "<li>sdfs</li>\n" +
      "<li>sdfsdf</li>\n" +
      "<li>sdfsaf</li>\n" +
      "</ul>\n" +
      "</blockquote>")
    expect(blockquote).toBe(
        "> * sdfs\n" +
        "> * sdfsdf\n" +
        "> * sdfsaf")
  })

  it('nest blockquote',()=>{
    let blockquote=html2Md("<blockquote>\n" +
      "<p>Blockquotes can also be nested…</p>\n" +
      "<blockquote>\n" +
      "<p>…by using additional greater-than signs right next to each other…</p>\n" +
      "<blockquote>\n" +
      "<p>…or with spaces between arrows.</p>\n" +
      "</blockquote>\n" +
      "</blockquote>\n" +
      "</blockquote>")

    expect(blockquote).toBe(
      "> Blockquotes can also be nested…\n" +
      ">\n" +
      ">> …by using additional greater-than signs right next to each other…\n" +
      ">>\n" +
      ">>> …or with spaces between arrows.")
  })
})


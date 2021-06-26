import Tag from "../../src/Tag";
import SelfCloseTag from "../../src/SelfCloseTag";

const html2Md = require('../../src/index')

describe('error test', () => {

  it('not integrity test', () => {
    let str='</ol>\n' +
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
      '</li>'

    expect(html2Md(str)).toBe(
        '>1. bq-nest-2\n' +
        '>\n' +
        '>>1. bq-nest-3\n')
  })

  it('unvalid tag', () => {
    let str='String send inside Tag'
    let tag=new Tag(str)
    expect(tag.content).toBe('')
  })


  it('unvalid selfTag', () => {
    let str='String send inside selfTag'
    let selfTag=new SelfCloseTag(str)
    expect(selfTag.attrs).toEqual({})
  })

  it('other tags inside tr', () => {
    let str="<table>\n" +
        "\n" +
        "<thead>\n" +
        "<tr>\n" +
        "<p>data-1-left</p>\n" +
        "<th>data-1-center</th>\n" +
        "</tr>\n" +
        "</thead>\n" +
        "<tbody>\n" +
        "<tr>\n" +
        "<td>data-1-left</td>\n" +
        "<td>data-1-center</td>\n" +
        "</tr>\n" +
        "<tr>\n" +
        "<td>data-2-left</td>\n" +
        "<td>data-2-center</td>\n" +
        "</tr>\n" +
        "<tr>\n" +
        "<td>data-3-left</td>\n" +
        "<td>data-3-center</td>\n" +
        "</tr>\n" +
        "</tbody>\n" +
        "</table>"
    expect(html2Md(str)).toBe('|data-1-center|\n' +
        '|---|\n' +
        '|data-1-left|data-1-center|\n' +
        '|data-2-left|data-2-center|\n' +
        '|data-3-left|data-3-center|\n')
  })

  it('Not valid p in Ol',()=>{
    let str='<ol>\n' +
        '<li>one</li>\n' +
        '<p>two</p>\n' +
        '<li>three</li>\n' +
        '</ol>'
    expect(html2Md(str)).toBe('1. one\n' +
        '2. three\n')
  })

  it('Not valid tag in Ul',()=>{
    let str='<ul>\n' +
        '<li>one</li>\n' +
        '<b>two</b>\n' +
        '<li>three</li>\n' +
        '</ul>'
    expect(html2Md(str)).toBe('*  one\n' +
        '*  three\n')
  })
})



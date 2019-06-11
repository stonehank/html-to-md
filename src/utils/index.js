const checkLang=require('./checkLang')
const {escape,unescape}=require('./escape')
const findValidTag=require('./findValidTag')
const findTagClass=require('./findTagClass')
const isSelfCloseTag=require('./isSelfCloseTag')
const parseAttrs=require('./parseAttrs')


module.exports={
  checkLang,
  escape,
  unescape,
  findTagClass,
  findValidTag,
  isSelfCloseTag,
  parseAttrs
}
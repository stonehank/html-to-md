const {escape,unescape}=require('./escape')
const findValidTag=require('./findValidTag')
const findTagClass=require('./findTagClass')
const isSelfClosing=require('./isSelfClosing')
const parseAttrs=require('./parseAttrs')
const getLanguage=require('./getLanguage')
const clearComment=require('./clearComment')


module.exports={
  escape,
  unescape,
  findTagClass,
  findValidTag,
  isSelfClosing,
  parseAttrs,
  getLanguage,
  clearComment
}
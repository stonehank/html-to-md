const {escape,extraEscape,unescape}=require('./escape')
const findValidTag=require('./findValidTag')
const findTagClass=require('./findTagClass')
const isSelfClosing=require('./isSelfClosing')
const parseAttrs=require('./parseAttrs')
const getLanguage=require('./getLanguage')
const clearComment=require('./clearComment')
const getRealTagName=require('./getRealTagName')
const needIndependentLine=require('./needIndependentLine')
const getTableAlign=require('./getTableAlign')
const shouldRenderRawInside=require('./shouldRenderRawInside')




module.exports={
  escape,
  extraEscape,
  unescape,
  getRealTagName,
  findTagClass,
  findValidTag,
  isSelfClosing,
  parseAttrs,
  getTableAlign,
  getLanguage,
  clearComment,
  needIndependentLine,
  shouldRenderRawInside,
}

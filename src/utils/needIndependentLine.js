let independentLineTags={
  'html':true,
  'body':true,
  'p':true,
  'div':true,
  'section':true,
  'blockquote':true,
  'aside':true,
  'li':true,
  'ul':true,
  'ol':true,
  'form':true,
  'hr':true,
  'h1':true,
  'h2':true,
  'h3':true,
  'h4':true,
  'h5':true,
  'h6':true,
  'dl':true,
  'dd':true,
  'dt':true,
  'br':true,
}

function needIndependentLine(tagName){
  return !!independentLineTags[tagName]
}

module.exports=needIndependentLine

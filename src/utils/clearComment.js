function clearComment(str){
  return str.replace(/<!--([^\n\r\t\s]|\n|\r|\t|\s)*?-->/g,'')
}

module.exports=clearComment
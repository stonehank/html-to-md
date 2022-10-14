function clearComment(str) {
  return str.replace(/<!--([^\n\r\t\s]|\n|\r|\t|\s)*?-->/g, '')
}

export default clearComment

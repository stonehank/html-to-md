function clearComment(str: string): string {
  return str.replace(/<!--([^\n\r\t\s]|\n|\r|\t|\s)*?-->/g, '')
}

export default clearComment

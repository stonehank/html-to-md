function clearComment(str: string): string {
  return str.replace(/<!--([\s\S]*?)-->/g, '')
}

export default clearComment

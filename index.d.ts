declare module 'html-to-md' {
  interface Html2mdOptions {
    skipTags: string[]
    emptyTags: string[]
    ignoreTags: string[]
    aliasTags: Record<string, string>
    renderCustomTag: boolean | 'SKIP' | 'EMPTY' | 'IGNORE'
  }

  function html2md(
    htmlSource: string,
    options?: Partial<Html2mdOptions>,
    force?: boolean
  ): string

  export default html2md
}

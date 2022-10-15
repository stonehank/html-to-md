export type OptionsKey =
  | 'skipTags'
  | 'emptyTags'
  | 'ignoreTags'
  | 'aliasTags'
  | 'renderCustomTags'

export type Html2MdOptions = {
  skipTags?: string[]
  emptyTags?: string[]
  ignoreTags?: string[]
  aliasTags?: Record<string, string>
  renderCustomTags?: boolean | 'SKIP' | 'EMPTY' | 'IGNORE'
}

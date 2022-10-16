export type OptionsKey =
  | 'skipTags'
  | 'emptyTags'
  | 'ignoreTags'
  | 'aliasTags'
  | 'renderCustomTags'

export type TagName = string | null

export type Html2MdOptions = {
  skipTags?: string[]
  emptyTags?: string[]
  ignoreTags?: string[]
  aliasTags?: Record<string, string>
  renderCustomTags?: boolean | 'SKIP' | 'EMPTY' | 'IGNORE'
}

export type TagOptions = {
  parentTag?: TagName
  prevTagName?: TagName
  nextTagName?: TagName
  keepFormat?: boolean
  prevTagStr?: string
  nextTagStr?: string
  isFirstTag?: boolean
  calcLeading?: boolean
  leadingSpace?: string
  layer?: number
  noWrap?: boolean
  match?: string | null
  indentSpace?: string
  language?: string
  count?: number
  tableColumnCount?: number
  noExtraLine?: boolean
}

export type SelfCloseTagOptions = {
  parentTag?: TagName
  prevTagName?: TagName
  nextTagName?: TagName
  isFirstTag?: boolean
  leadingSpace?: string
  layer?: number
}

export type ParseOptions = {
  parentTag?: TagName
  prevTagName?: TagName
  nextTagName?: TagName
  nextTagStr?: string
  prevTagStr?: string
  leadingSpace?: string
  layer?: number
  keepFormat?: boolean
  calcLeading?: boolean
}

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

export type TagOptions = {
  parentTag?: string | null
  prevTagName?: string | null
  nextTagName?: string | null
  keepFormat?: boolean
  prevTagStr?: string
  nextTagStr?: string
  isFirstTag?: boolean
  calcLeading?: boolean
  leadingSpace?: string
  layer?: number
  noWrap?: boolean
  match?: string | null
  intendSpace?: string
  language?: string
  count?: number
  tableColumnCount?: number
  noExtraLine?: boolean
}

export type SelfCloseTagOptions = {
  parentTag?: string | null
  prevTagName?: string | null
  nextTagName?: string | null
  isFirstTag?: boolean
  leadingSpace?: string
  layer?: number
}

export type ParseOptions = {
  parentTag?: string | null
  prevTagName?: string | null
  nextTagName?: string | null
  nextTagStr?: string
  prevTagStr?: string
  leadingSpace?: string
  layer?: number
  keepFormat?: boolean
  calcLeading?: boolean
}

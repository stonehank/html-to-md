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
  tagListener?: (
    tag: TagName,
    props: TagListenerProps
  ) => TagListenerReturnProps
}

export type TagOptions = {
  parentTag?: TagName
  prevTagName?: TagName
  nextTagName?: TagName
  keepSpace?: boolean
  prevTagStr?: string
  nextTagStr?: string
  isFirstSubTag?: boolean
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
  inTable?: boolean
}

export type SelfCloseTagOptions = {
  parentTag?: TagName
  prevTagName?: TagName
  nextTagName?: TagName
  match?: string | null
  isFirstSubTag?: boolean
  leadingSpace?: string
  layer?: number
  inTable?: boolean
}

export type ParseOptions = {
  parentTag?: TagName
  prevTagName?: TagName
  nextTagName?: TagName
  nextTagStr?: string
  prevTagStr?: string
  leadingSpace?: string
  layer?: number
  keepSpace?: boolean
  calcLeading?: boolean
  inTable?: boolean
}

export interface TagProps {
  tagName: TagName
  parentTag: TagName
  prevTagName: TagName
  nextTagName: TagName
  rawStr: string
  prevTagStr: string
  nextTagStr: string
  isFirstSubTag: boolean
  calcLeading: boolean
  leadingSpace: string
  layer: number
  noWrap: boolean
  match: string | null
  indentSpace: string
  language: string
  count: number
  tableColumnCount: number
  noExtraLine: boolean
  keepSpace: boolean
  attrs: Record<string, string>
  innerHTML: string
  inTable: boolean
}

export interface SelfCloseTagProps {
  tagName: TagName
  parentTag: TagName
  prevTagName: TagName
  nextTagName: TagName
  rawStr: string
  isFirstSubTag: boolean
  match: string | null
  leadingSpace: string
  layer: number
  attrs: Record<string, string>
  innerHTML: string
  inTable: boolean
}

export type TagListenerProps = {
  parentTag: TagName
  prevTagName: TagName
  nextTagName: TagName
  isFirstSubTag: boolean
  attrs: Record<string, string>
  innerHTML: string
  match: string | null
  isSelfClosing: boolean
  language?: string
}

export type TagListenerReturnProps = {
  attrs: Record<string, string>
  match: string | null
  language?: string
}

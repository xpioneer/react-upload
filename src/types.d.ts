
declare module '*.less' {
  const classNames: Readonly<Record<string, string>>
  export default classNames
}

declare interface ImageFile extends File {
  url?: string
  key?: string
  error?: boolean
  alt?: string
}

declare type OperationType = 'add' | 'remove'

declare interface IUploadPickerPorps {
  className: string
  style: React.CSSProperties
  files: ImageFile[]
  selectable: boolean
  multiple: boolean
  accept: string
  length: number | string
  capture: any
  disableDelete: boolean
  onChange: (files: ImageFile[], operationType: OperationType, index?: number) => void
  onImageClick: (index?: number, files?: ImageFile[]) => void
  onAddImageClick: (e: React.MouseEvent) => void
  onFail: (msg: string) => void
  // onRemove: (index: number) => void
}

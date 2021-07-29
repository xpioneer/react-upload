### React Upload Component

#### A Simple React-Upload Component
Very Very Very Simple...😄


#### Advantage
```
1. Support image preview
2. Can choose video or other files
3. Square layout
4. simple...(maybe more~)
```

#### Options
```ts
// every is optional
interface IUploadPickerPorps {
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
```

#### How to Use
```tsx
import { UploadComponent } from 'react-upload'

<UploadComponent
  length={2}
  files={[]}
  onChange={(files: ImageFile[], operationType: OperationType, index?: number) =>{
    // your code
  }}>
```
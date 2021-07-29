import React, { useRef, useState } from 'react'
import styles from './style.less'
import './style.less'
import { useEffect } from 'react'


const file2Base64 = async (file: File) => {
  return new Promise<{url: string, alt: string}>((resolve, reject) => {
    if (/^image/.test(file.type)) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function (e) {
        resolve({url: e.target.result as string, alt: file.name})
      }
    } else {
      resolve({url: '', alt: 'Cannot Preview'})
    }
  })
}

const setKey = () => Math.random().toString(16).slice(2, 8) + '-' + Date.now()


export const UploadComponent = (props: Partial<IUploadPickerPorps>) => {

  const {
    className = '',
    style = {},
    files,
    multiple,
    accept = 'image/*',
    length = 1,
    capture,
    onChange = (files: ImageFile[], operationType: OperationType, index?: number) => {},
    onImageClick = (index?: number, files?: ImageFile[]) => {}
  } = props

  const inputRef = useRef<HTMLInputElement>()
  const [$files, setFiles] = useState<ImageFile[]>([])

  const _onChange = (fileList: ImageFile[], type: OperationType, index?: number) => {
    console.log(fileList, type, index)
    !files && setFiles(fileList)
    onChange(fileList, type)
  }

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files: changedFiles } = e.target
    let _files = [...$files]
    console.log('changedFiles:', changedFiles)
    for (let i = 0; i < changedFiles.length; i++) {
      const {url, alt} = await file2Base64(changedFiles[i])
      _files.push({
        ...changedFiles[i],
        key: setKey(),
        url,
        alt
      })
    }
    _onChange(_files, 'add')
  }

  const onImgRemove = (index: number) => {
    let _files = [...$files]
    _files.splice(index, 1)
    _onChange(_files, 'remove', index)
  }

  useEffect(() => {
    setFiles(files || [])
  }, [files])

  return (
    <div className={styles.uploadW}>
      <div className={styles.uploadList}>
        {
          $files.map((file, idx) => {
            return <div key={file.key} className={styles.fileItem}>
              <div>
                <div className={styles.picW}>
                  <div className={styles.icon} onClick={() => onImgRemove(idx)}></div>
                  <img src={file.url} alt={file.alt} onClick={() => onImageClick(idx, $files)}/>
                </div>
              </div>
            </div>
          })
        }
        <div className={styles.fileItem}>
          <div>
            <div className={styles.picW}>
              <input
                type="file"
                ref={inputRef}
                accept={'*'}
                capture={capture}
                multiple={true}
                className={[styles.input, className].join(' ')}
                onChange={onFileChange} />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
}

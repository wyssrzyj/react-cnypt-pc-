import React, { useState, useRef } from 'react'
import Upload from 'rc-upload'
import { useStores } from '@/utils/mobx'
import { getToken } from '@/utils/tool'
import { cloneDeep } from 'lodash'
import styles from './index.module.less'

const UploadFile = ({ onChange }) => {
  const uploadRef: any = useRef()
  const { factoryPageStore } = useStores()
  const { uploadFiles } = factoryPageStore

  const [filelist, setFileList] = useState([])

  const props = {
    action: '/api/oss/file/upload',
    data: { a: 1, b: 2 },
    headers: {
      authorization: getToken()
    },
    multiple: false,
    async customRequest({ file }) {
      const list = cloneDeep(filelist)
      const formData = new FormData()

      formData.append('file', file)
      formData.append('module', 'factory')
      const res = await uploadFiles(formData)
      onChange && (await onChange(res))
      list.push({ thumbUrl: res })
      setFileList(list)
    }
  } as any

  const uploadFile = () => {
    uploadRef.current.click()
  }

  return (
    <div>
      <div className={styles.avatarText} onClick={uploadFile}>
        修改头像
      </div>
      <Upload {...props}>
        <a ref={uploadRef} style={{ display: 'none' }}>
          开始上传
        </a>
      </Upload>
    </div>
  )
}

export default UploadFile

import React, { useState } from 'react'
import styles from './index.module.less'
import { Upload, message } from 'antd'
import { cloneDeep } from 'lodash'
import OSS from '@/utils/oss'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

const CusUpload = props => {
  const { tips, maxCount = 999, btnText, valuesChange } = props

  const [fileList, setFileList] = useState([])
  const [loading, setLoading] = useState(false)

  const beforeUpload: any = file => {
    const isJpgOrPng =
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpeg'

    if (!isJpgOrPng) {
      message.error('只能上传jpg/png格式文件!')
      return false
    }
    return true
  }

  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(fileList) || []
    setLoading(true)
    // /capacity-platform/platform 目标文件夹路径 __ 分割符号
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}__${file.name}`,
      file
    )
    setLoading(false)
    if (res) {
      const { url, name } = res
      imgs.push({ thumbUrl: url, name: name.split('__')[1], url })
      setFileList(imgs)
      valuesChange && valuesChange(imgs)
    }
  }

  const fileRemove = file => {
    const oldData = cloneDeep(fileList) || []
    const imgs = oldData.filter(item => item.thumbUrl !== file.thumbUrl)
    setFileList(imgs)
    valuesChange && valuesChange(imgs)
  }

  const uploadButton = (
    <div>
      {loading ? (
        <LoadingOutlined className={styles.icon} />
      ) : (
        <PlusOutlined className={styles.icon} />
      )}
      <div className={styles.uploadText}>{btnText ? btnText : '上传'}</div>
    </div>
  )

  return (
    <div>
      <Upload
        fileList={fileList}
        accept={'.jpg,.png,.jpeg'}
        name="file"
        beforeUpload={beforeUpload}
        customRequest={customRequest}
        className={styles.upload}
        listType="picture-card"
        maxCount={maxCount}
        onRemove={fileRemove}
      >
        {fileList.length < maxCount ? uploadButton : null}
      </Upload>
      {tips && <div className={styles.uploadTips}>{tips}</div>}
    </div>
  )
}

export default CusUpload

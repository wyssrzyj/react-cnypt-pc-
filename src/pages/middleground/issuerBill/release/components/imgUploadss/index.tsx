import React, { useState } from 'react'
import { Upload, Modal, message } from 'antd'
import OSS from '@/utils/oss'
import { cloneDeep } from 'lodash'

// function getBase64(file) {
//   console.log(file)

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader()
//     reader.readAsDataURL(file)
//     reader.onload = () => resolve(reader.result)
//     reader.onerror = error => reject(error)
//   })
// }

function index() {
  const [previewVisible, setPreviewVisible] = useState(false)
  const [fileList, setFileList] = useState<any>([])

  const [previewImage, setpreviewImage] = useState()
  const [previewTitle, setpreviewTitle] = useState()

  const handleCancel = () => setPreviewVisible(false)
  //  上传之前的回调
  const beforeUpload = file => {
    //   判断了两个类型  文件类型和文件大小
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('只能上传jpg/png格式文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('文件不能超过20M')
    }
    return isJpgOrPng && isLt2M
  }
  let cums = file => {
    let sum = []
    sum.push(file)
    return sum
  }
  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(fileList) || []
    // /capacity-platform/platform 目标文件夹路径 __ 分割符号
    let sum = []
    sum.push(cums(file))
    console.log(sum)

    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}__${file.name}`,
      file
    )

    if (res) {
      const { url, name } = res
      imgs.push({ thumbUrl: url, name: name.split('__')[1], url })
      console.log('img的值', imgs)
      setFileList(imgs)
    }
  }

  //  弹窗
  const handlePreview = file => {
    setpreviewImage(file.url || file.preview)
    setpreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    )
    setPreviewVisible(true)
  }

  const handleChange = ({ file }) => {
    console.log(file)
    let sum = []
    sum.push(file)
    return sum
  }

  const uploadButton = (
    <div>
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )
  {
    console.log(fileList)
  }
  return (
    <>
      <Upload
        multiple={true}
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={handleChange} //  //上传的处理函数
        customRequest={customRequest} //自定义自己的上传实现
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  )
}

export default index

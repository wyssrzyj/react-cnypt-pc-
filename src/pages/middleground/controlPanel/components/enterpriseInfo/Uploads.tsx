import React, { useState } from 'react'
import { Upload, Modal, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import OSS from '@/utils/oss' //图片上传接口
import { cloneDeep } from 'lodash'

const Uploads = props => {
  const { onChange, num, fileList = [], valuesChange, btnText } = props
  //onChange form提交用得上
  //num 最大数量
  //fileList 数据
  //valuesChange 方法传递到外部
  //btnText 文字
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState()
  // 图片放大
  const handleCancel = () => {
    setPreviewVisible(false)
  }
  // 查看放大
  const handlePreview = () => {
    setPreviewVisible(true)
    setPreviewImage(fileList[0].thumbUrl)
  }
  // 清除事件
  const onRemove = file => {
    // 过滤出不等于点击的图片
    const oldData = cloneDeep(fileList) || []
    const imgs = oldData.filter(item => item.thumbUrl !== file.thumbUrl)
    valuesChange && valuesChange(imgs) //数据传递到外部
  }
  // 文件过滤
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
  }
  // 样式
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 1 }}>{btnText ? btnText : '上传'}</div>
    </div>
  )

  //  获取图片的数据
  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(fileList) || []
    // /capacity-platform/platform 目标文件夹路径 __ 分割符号
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}__${file.name}`,
      file
    )
    if (res) {
      const { url, name } = res
      imgs.push({ thumbUrl: url, name: name.split('__')[1], url })
      valuesChange && valuesChange(imgs) //传递给外部
      onChange(url) //把图片数据放到form中，且把数据处理好返回给form
    }
  }

  return (
    <div>
      <Upload
        name="file"
        className="avatar-uploader"
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        customRequest={customRequest} //自定义上传 oss
        onPreview={handlePreview} //查看
        onRemove={onRemove} //清除
      >
        {fileList.length >= num ? null : uploadButton}
      </Upload>
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default Uploads

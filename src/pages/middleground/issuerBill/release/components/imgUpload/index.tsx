import React, { useState } from 'react'
import { Upload, message } from 'antd'
import { cloneDeep } from 'lodash'
import OSS from '@/utils/oss'

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'

function imgUpload() {
  // const [imageUrl, setImageUrl] = useState('')
  const [nodeValue, setNodeValue] = useState([])
  //   师傅的方法---------------------

  const customRequest = async ({ file }) => {
    const imgs = cloneDeep(nodeValue) || []
    // /capacity-platform/platform 目标文件夹路径 __ 分割符号
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}__${file.name}`,
      file
    )
    if (res) {
      const { url, name } = res
      imgs.push({ thumbUrl: url, name: name.split('__')[1], url })
      setNodeValue(imgs)
    }
  }

  //   师傅的方法---------------------
  const [loading, setLoading] = useState(false)

  const beforeUpload = file => {
    //   判断了两个类型  文件类型和文件大小
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

  //上传过程中执行的回调处理函数
  const handleChange = info => {
    //    info.file.status 表示上传状态 当期只为done的时候表示 上传成功服务器又返回
    if (info.file.status === 'uploading') {
      setLoading(true) //改变loading值 表示正在加载中
      console.log('上传中')
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log('上传成功')

      //   setLoading(false) //改变loading值 表示正在完成
      console.log(info)
      //   setimageUrl 改变一下图片的地址
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  )
  return (
    <div>
      <Upload
        //name 服务器端接受到的name属性
        name="file"
        fileList={nodeValue}
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        //表示上传的服务器接口  此处替换为我们的
        // action="/api/oss/file/upload"
        customRequest={customRequest} //自定义自己的上传实现
        //上传之前的回调函数
        beforeUpload={beforeUpload}
        //上传的处理函数
        onChange={handleChange}
      >
        {nodeValue.length >= 8 ? null : uploadButton}
        {/* {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
        ) : (
          uploadButton
        )} */}
      </Upload>
    </div>
  )
}

export default imgUpload

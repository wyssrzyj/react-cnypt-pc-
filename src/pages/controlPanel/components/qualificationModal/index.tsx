import React, { useState } from 'react'
import {
  Modal,
  Form,
  Select,
  Input,
  Radio,
  DatePicker,
  Upload,
  message
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'

const { Option } = Select

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

const PeriodValidity = () => {
  const [timeType, setTimeType] = useState<string>('')
  const onTimeChange = e => {
    setTimeType(e.target.value)
  }
  const onDateChange = () => {}
  return (
    <div>
      <Radio.Group onChange={onTimeChange} value={timeType}>
        <Radio value="short">选择截止时间</Radio>
        <Radio value="long">长期有效</Radio>
      </Radio.Group>
      {timeType === 'short' && <DatePicker onChange={onDateChange} />}
    </div>
  )
}

const QualificationModal = props => {
  const { visible } = props
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const handleOk = () => {}
  const handleCancel = () => {}

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

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

  const handleChange = info => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        setImageUrl(imageUrl)
        setLoading(false)
      })
    }
  }

  return (
    <Modal
      title="新增资质"
      visible={visible}
      width={632}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        {...layout}
        name="basic"
        // initialValues={{ remember: true }}
      >
        <Form.Item
          label="资质名称"
          name="qualificationName"
          rules={[{ required: true, message: '请选择资质名称！' }]}
        >
          <Select placeholder="请选择资质名称">
            <Option value="jack">Jack</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="证书编号"
          name="certificateNumber"
          rules={[{ required: true, message: '请输入证书编号!' }]}
        >
          <Input placeholder="请输入证书编号" />
        </Form.Item>

        <Form.Item
          label="有效期"
          name="periodValidity"
          rules={[{ required: true, message: '请输入证书编号!' }]}
        >
          <PeriodValidity />
        </Form.Item>

        <Form.Item
          label="资质上传"
          name="qualification"
          rules={[{ required: true, message: '请输长传资质证书!' }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
      </Form>
      <div className={styles.imageInfo}>
        <div>1）请提供清晰的证件原件拍照或扫描件；</div>
        <div>2）请选择jpg、jpge、png格式的图片上传，图片大小不超过2M；</div>
        <div>3）证书上的公司名称必须与登记的企业名称一致</div>
      </div>
    </Modal>
  )
}

export default QualificationModal

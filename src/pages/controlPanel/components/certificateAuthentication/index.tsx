import React, { useState } from 'react'
import {
  Steps,
  Alert,
  Form,
  Select,
  Input,
  Upload,
  message,
  Checkbox,
  Button
} from 'antd'
import styles from './index.module.less'

const { Step } = Steps

const { Option } = Select

const messageTip = '企业证件信息仅用于进行实名认证，不会泄露您的任何证件信息。'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
const certificateTypeMap = [
  { label: '企业营业执照', value: '企业营业执照' },
  { label: '组织机构代码证', value: '组织机构代码证' },
  { label: '事业单位法人证书', value: '事业单位法人证书' },
  { label: '社会团体法人登记证书', value: '社会团体法人登记证书' },
  { label: '行政执法主体资格证', value: '行政执法主体资格证' },
  { label: '其他', value: '其他' }
]
const CertificateAuthentication = () => {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [isCheck, setIsCheck] = useState(false)
  console.log(
    '🚀 ~ file: index.tsx ~ line 27 ~ CertificateAuthentication ~ loading',
    loading
  )

  const uploadButton = (
    <div>
      <div className={styles.attachmentTip}>
        上传的图片格式要求jpg、jpeg、bmp、png，不超过10M；文件名(包含后缀名)的最大长度为100个字符。
      </div>
      <div className={styles.attachment}></div>
    </div>
  )

  const positiveDom = <div className={styles.positiveDom}></div>

  const reverseDom = <div className={styles.reverseDom}></div>

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

  const getBase64 = (img, callback) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
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

  const onBoxChange = e => {
    setIsCheck(e.target.checked)
  }

  return (
    <div>
      <div className={styles.steps}>
        <Steps current={0}>
          <Step title="证件信息" />
          <Step title="待审核" />
        </Steps>
      </div>
      <Alert message={messageTip} type="info" showIcon />
      <Form
        {...layout}
        name="basic"
        initialValues={{ documentType: '中国大陆居民身份证' }}
      >
        <div className={styles.enterprise}>
          <h3>请上传企业证件</h3>
          <Form.Item
            label="企业证件类型"
            name="certificateType"
            rules={[{ required: true, message: '请选择企业证件类型！' }]}
          >
            <Select placeholder="请选择企业证件类型">
              {certificateTypeMap.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="上传企业证件附件"
            name="enterpriseAdjunct"
            rules={[{ required: true, message: '请上传企业证件附件！' }]}
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

          <Form.Item
            label="企业名称"
            name="enterpriseName"
            rules={[{ required: true, message: '请输入企业名称！' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles.codeLabel}>
                统一社会信用代码/组织机构代码
              </span>
            }
            name="code"
            rules={[
              {
                required: true,
                message: '请输入统一社会信用代码/组织机构代码！'
              }
            ]}
          >
            <Input placeholder="请输入统一社会信用代码/组织机构代码" />
          </Form.Item>
        </div>
        <div className={styles.enterprise}>
          <h3>请上传法定代表人证件</h3>
          <Form.Item
            label="证件类型"
            name="documentType"
            rules={[{ required: true, message: '请输入证件类型！' }]}
          >
            <Input disabled placeholder="请输入证件类型" />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="name"
            rules={[
              { required: true, message: '请输入中国大陆居民身份证上的姓名！' }
            ]}
          >
            <Input placeholder="请输入中国大陆居民身份证上的姓名" />
          </Form.Item>

          <Form.Item
            label="证件号码"
            name="idNumber"
            rules={[
              {
                required: true,
                message: '请输入中国大陆居民身份证上的身份证号！'
              }
            ]}
          >
            <Input placeholder="请输入中国大陆居民身份证上的身份证号" />
          </Form.Item>

          <Form.Item
            label="中国大陆居民身份证人像面"
            name="positive"
            rules={[
              { required: true, message: '请上传中国大陆居民身份证人像面！' }
            ]}
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
                positiveDom
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="中国大陆居民身份证国徽面"
            name="positive"
            rules={[
              { required: true, message: '请上传中国大陆居民身份证国徽面！' }
            ]}
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
                reverseDom
              )}
            </Upload>
          </Form.Item>
        </div>
      </Form>
      <Checkbox onChange={onBoxChange}>
        请务必提供真实信息，平台有权自行或委托第三方，审查您提供的身份信息是否真实、有效。若提供虚假信息，由此带来的全部结果由您承担。
      </Checkbox>
      <div className={styles.submit}>
        <Button disabled={!isCheck} type="primary">
          确认提交
        </Button>
      </div>
    </div>
  )
}

export default CertificateAuthentication

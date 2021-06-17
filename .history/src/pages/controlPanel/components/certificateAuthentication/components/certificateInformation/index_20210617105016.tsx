import React, { useState } from 'react'
import {
  Alert,
  Form,
  Select,
  Input,
  Upload,
  message,
  Checkbox,
  Button
} from 'antd'
import { isFunction, cloneDeep } from 'lodash'
import axios from '@/utils/axios'
import { useStores } from '@/utils/mobx'
import styles from './index.module.less'

const { Option } = Select

const messageTip = '企业证件信息仅用于进行实名认证，不会泄露您的任何证件信息。'

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 }
}
const certificateTypeMap = [
  { label: '企业营业执照', value: 'businessLicense' },
  { label: '组织机构代码证', value: '组织机构代码证' },
  { label: '事业单位法人证书', value: '事业单位法人证书' },
  { label: '社会团体法人登记证书', value: '社会团体法人登记证书' },
  { label: '行政执法主体资格证', value: '行政执法主体资格证' },
  { label: '其他', value: '其他' }
]

const CertificateInformation = props => {
  const { submit } = props
  const [form] = Form.useForm()
  const { validateFields } = form
  const { factoryPageStore } = useStores()
  const { uploadFiles } = factoryPageStore
  const enterpriseInfo =
    JSON.parse(localStorage.getItem('enterpriseInfo')) || {}
  console.log(localStorage.getItem('enterpriseInfo'))
  const [imageUrl, setImageUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [fileList, setFileList] = useState<any[]>([])

  const initialValues = {
    enterpriseName: enterpriseInfo.enterpriseName,
    legalPersonIdType: '中国大陆居民身份证'
  }
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
  const beforeUpload = file => {
    const isJpgOrPng =
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpeg'
    if (!isJpgOrPng) {
      message.error('只能上传jpg/png格式文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 10
    if (!isLt2M) {
      message.error('文件不能超过10M!')
    }
    return isJpgOrPng && isLt2M
  }
  const customRequest = async ({ file }) => {
    console.log('🚀 ~ file: index.tsx ~ line 98 ~ customRequest ~ file', file)
    setLoading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'factory')
    const res = await uploadFiles(formData)
    setImageUrl(res)
    setLoading(false)
    setFileList([{ thumbUrl: res }])
  }
  const fileRemove = file => {
    const arrList = cloneDeep(fileList)
    const target = arrList.filter(item => item.thumbUrl !== file.thumbUrl)
    setFileList(target)
  }
  const handleConfirm = () => {
    validateFields().then(values => {
      const { area = [], businessAddress = {} } = values
      const { address, location } = businessAddress
      delete values.area
      delete values.businessAddress
      axios
        .post('/api/factory/enterprise/submit-enterprise-credential', {
          ...values,
          enterpriseLogoUrl: imageUrl,
          provinceId: area[0],
          cityId: area[1],
          districtId: area[2],
          address,
          latitude: location.split(',')[1],
          longitude: location.split(',')[0]
        })
        .then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
        })
    })
    isFunction(submit) && submit(1)
  }

  return (
    <div className={styles.certificateInformation}>
      <Alert message={messageTip} type="info" showIcon />
      <Form {...layout} name="basic" initialValues={initialValues}>
        <div className={styles.enterprise}>
          <h3>请上传企业证件</h3>
          <Form.Item
            label="企业证件类型"
            name="certificateType"
            rules={[{ required: true, message: '请选择企业证件类型！' }]}
          >
            <Select
              defaultValue="businessLicense"
              placeholder="请选择企业证件类型"
              disabled
            >
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
              showUploadList={true}
              beforeUpload={beforeUpload}
              customRequest={customRequest}
              fileList={fileList}
              maxCount={1}
              onRemove={fileRemove}
            >
              {/* {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
            ) : (
              uploadButton
            )} */}

              {fileList.length < 1 ? uploadButton : null}
            </Upload>
          </Form.Item>

          <Form.Item
            label="企业名称"
            name="enterpriseName"
            rules={[{ required: true, message: '请输入企业名称！' }]}
          >
            <Input disabled />
          </Form.Item>

          <Form.Item
            label={
              <span className={styles.codeLabel}>
                统一社会信用代码/组织机构代码
              </span>
            }
            name="orgCode"
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
            name="legalPersonIdType"
            rules={[{ required: true, message: '请输入证件类型！' }]}
          >
            <Input disabled placeholder="请输入证件类型" />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="legalPersonName"
            rules={[
              { required: true, message: '请输入中国大陆居民身份证上的姓名！' }
            ]}
          >
            <Input placeholder="请输入中国大陆居民身份证上的姓名" />
          </Form.Item>

          <Form.Item
            label="证件号码"
            name="legalPersonIdNumber"
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
        <Button disabled={!isCheck} type="primary" onClick={handleConfirm}>
          确认提交
        </Button>
      </div>
    </div>
  )
}

export default CertificateInformation

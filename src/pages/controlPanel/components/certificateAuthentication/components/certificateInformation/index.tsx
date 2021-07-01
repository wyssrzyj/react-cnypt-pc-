import React, { useState, useEffect } from 'react'
import { Alert, Form, Select, Input, Upload, message, Checkbox, Button } from 'antd'
import { isFunction, isEmpty } from 'lodash'
import axios from '@/utils/axios'
import { useStores } from '@/utils/mobx'
import { getUserInfo } from '@/utils/tool'
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
  const currentUser = getUserInfo() || {}
  const { enterpriseId } = currentUser
  const [form] = Form.useForm()
  const { validateFields, setFieldsValue } = form
  const { factoryPageStore } = useStores()
  const { uploadFiles } = factoryPageStore
  const enterpriseInfo = JSON.parse(localStorage.getItem('enterpriseInfo')) || {}

  const newEnterpriseId = isEmpty(enterpriseInfo) ? enterpriseId : enterpriseInfo.enterpriseId
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [cardId, setCardId] = useState(undefined)
  const [cardImageUrl, setCardImageUrl] = useState<string>('')
  const [cardFileList, setCardFileList] = useState<any[]>([])
  const [positiveId, setPositiveId] = useState(undefined)
  const [positiveImageUrl, setPositiveImageUrl] = useState<string>('')
  const [positiveFileList, setPositiveFileList] = useState<any[]>([])
  const [reverseId, setReverseId] = useState(undefined)
  const [reverseImageUrl, setReverseImageUrl] = useState<string>('')
  const [reverseFileList, setReverseFileList] = useState<any[]>([])

  const initialValues = {
    enterpriseName: enterpriseInfo.enterpriseName,
    legalPersonIdType: '中国大陆居民身份证',
    certificateType: 'businessLicense'
  }
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

  const onBoxChange = e => {
    setIsCheck(e.target.checked)
  }
  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg'
    if (!isJpgOrPng) {
      message.error('只能上传jpg/png格式文件!')
    }
    const isLt10M = file.size / 1024 / 1024 < 10
    if (!isLt10M) {
      message.error('文件不能超过10M!')
    }
    return isJpgOrPng && isLt10M
  }
  const customRequestCard = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'factory-service')
    const res = await uploadFiles(formData)
    setCardImageUrl(res)
    setCardFileList([{ thumbUrl: res }])
  }
  // 中国大陆居民身份证人像面
  const customRequestPositive = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'factory-service')
    const res = await uploadFiles(formData)
    setPositiveImageUrl(res)
    setPositiveFileList([{ thumbUrl: res }])
  }
  //中国大陆居民身份证国徽面
  const customRequestReverse = async ({ file }) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('module', 'factory-service')
    const res = await uploadFiles(formData)
    setReverseImageUrl(res)
    setReverseFileList([{ thumbUrl: res }])
  }

  const handleConfirm = () => {
    validateFields().then(values => {
      delete values.enterpriseAdjunct
      delete values.positive
      delete values.reverse
      delete values.certificateType
      delete values.enterpriseName
      const enterpriseCredentialList = [
        {
          businessId: newEnterpriseId,
          businessItemId: 'business_license',
          fileUrl: cardImageUrl,
          id: cardId
        },
        {
          businessId: newEnterpriseId,
          businessItemId: 'legal_person_id_photo_face',
          fileUrl: positiveImageUrl,
          id: positiveId
        },
        {
          businessId: newEnterpriseId,
          businessItemId: 'legal_person_id_photo_national',
          fileUrl: reverseImageUrl,
          id: reverseId
        }
      ]
      axios
        .post('/api/factory/enterprise/submit-enterprise-credential', {
          ...values,
          enterpriseId: newEnterpriseId,
          enterpriseCredentialList
        })
        .then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          if (success) {
            isFunction(submit) && submit(1)
          }
        })
    })
  }

  const getCertificationInfo = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-credential', {
        enterpriseId: newEnterpriseId
      })
      .then(response => {
        const { success, data } = response
        if (success && !isEmpty(data)) {
          const { legalPersonIdNumber, legalPersonName, orgCode, enterpriseCredentialList } = data
          if (legalPersonIdNumber && legalPersonName && orgCode) {
            let newCardUrl = { id: '', fileUrl: '' }
            let newPositiveUrl = { id: '', fileUrl: '' }
            let newReverseUrl = { id: '', fileUrl: '' }
            if (!isEmpty(enterpriseCredentialList)) {
              newCardUrl = enterpriseCredentialList.find(item => item.businessItemId === 'business_license') || {}
              setCardImageUrl(newCardUrl.fileUrl)
              setCardFileList([{ thumbUrl: newCardUrl.fileUrl }])
              setCardId(newCardUrl.id)

              newPositiveUrl = enterpriseCredentialList.find(item => item.businessItemId === 'legal_person_id_photo_face') || {}
              setPositiveImageUrl(newPositiveUrl.fileUrl)
              setPositiveFileList([{ thumbUrl: newPositiveUrl.fileUrl }])
              setPositiveId(newPositiveUrl.id)

              newReverseUrl = enterpriseCredentialList.find(item => item.businessItemId === 'legal_person_id_photo_national') || {}
              setReverseImageUrl(newReverseUrl.fileUrl)
              setReverseFileList([{ thumbUrl: newReverseUrl.fileUrl }])
              setReverseId(newReverseUrl.id)
            }
            setFieldsValue({
              legalPersonIdNumber,
              legalPersonName,
              orgCode,
              enterpriseAdjunct: newCardUrl.fileUrl,
              positive: newPositiveUrl.fileUrl,
              reverse: newReverseUrl.fileUrl
            })
          }
        }
      })
  }

  useEffect(() => {
    if (newEnterpriseId) {
      getCertificationInfo()
    } else {
      message.warning('请先去完善企业信息！')
    }
  }, [])

  return (
    <div className={styles.certificateInformation}>
      <Alert message={messageTip} type="info" showIcon />
      <Form {...layout} name="basic" form={form} initialValues={initialValues}>
        <div className={styles.enterprise}>
          <h3>请上传企业证件</h3>
          <Form.Item label="企业证件类型" name="certificateType" rules={[{ required: true, message: '请选择企业证件类型！' }]}>
            <Select placeholder="请选择企业证件类型" disabled>
              {certificateTypeMap.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="上传企业证件附件" name="enterpriseAdjunct" rules={[{ required: true, message: '请上传企业证件附件！' }]}>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              customRequest={customRequestCard}
              fileList={cardFileList}
              maxCount={1}
              onRemove={() => setCardFileList([])}
            >
              {isEmpty(cardFileList) ? uploadButton : null}
            </Upload>
          </Form.Item>

          <Form.Item label="企业名称" name="enterpriseName" rules={[{ required: true, message: '请输入企业名称！' }]}>
            <Input disabled />
          </Form.Item>

          <Form.Item
            label={<span className={styles.codeLabel}>统一社会信用代码/组织机构代码</span>}
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
          <Form.Item label="证件类型" name="legalPersonIdType" rules={[{ required: true, message: '请输入证件类型！' }]}>
            <Input disabled placeholder="请输入证件类型" />
          </Form.Item>

          <Form.Item label="姓名" name="legalPersonName" rules={[{ required: true, message: '请输入中国大陆居民身份证上的姓名！' }]}>
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
            rules={[{ required: true, message: '请上传中国大陆居民身份证人像面！' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              customRequest={customRequestPositive}
              fileList={positiveFileList}
              maxCount={1}
              onRemove={() => setPositiveFileList([])}
            >
              {isEmpty(positiveFileList) ? positiveDom : null}
            </Upload>
          </Form.Item>

          <Form.Item
            label="中国大陆居民身份证国徽面"
            name="reverse"
            rules={[{ required: true, message: '请上传中国大陆居民身份证国徽面！' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={true}
              beforeUpload={beforeUpload}
              customRequest={customRequestReverse}
              fileList={reverseFileList}
              maxCount={1}
              onRemove={() => setReverseFileList([])}
            >
              {isEmpty(reverseFileList) ? reverseDom : null}
            </Upload>
          </Form.Item>
        </div>
      </Form>
      <Checkbox onChange={onBoxChange}>
        请务必提供真实信息，平台有权自行或委托第三方，审查您提供的身份信息是否真实、有效。若提供虚假信息，由此带来的全部结果由您承担。
      </Checkbox>
      <div className={styles.submit}>
        <Button disabled={!isCheck} type="primary" onClick={handleConfirm}>
          确认{cardId ? '修改' : '提交'}
        </Button>
      </div>
    </div>
  )
}

export default CertificateInformation

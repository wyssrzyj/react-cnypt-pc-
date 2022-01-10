import React, { useState, useEffect } from 'react'
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
import { toJS } from 'mobx'
import moment from 'moment'
import { isFunction, get, cloneDeep } from 'lodash'
import axios from '@/utils/axios'
import { useStores } from '@/utils/mobx'
import styles from './index.module.less'

const { Option } = Select

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
}

const typeMap = { add: '新增', edit: '编辑', check: '查看' }

const PeriodValidity = props => {
  const { onChange, value, type } = props
  const [timeType, setTimeType] = useState<string>(value === '1' ? '1' : '0')
  const [date, setDate] = useState(value === '1' ? null : moment(value))
  const onTimeChange = e => {
    setTimeType(e.target.value)
    e.target.value === '1' && isFunction(onChange) && onChange('1')
  }
  const onDateChange = data => {
    setDate(data)
    isFunction(onChange) && onChange(moment(data).format('x'))
  }
  return (
    <div>
      <Radio.Group
        onChange={onTimeChange}
        value={timeType}
        disabled={type === 'check'}
      >
        <Radio value="0">选择截止时间</Radio>
        <Radio value="1">长期有效</Radio>
      </Radio.Group>
      {timeType === '0' && (
        <DatePicker
          value={date}
          onChange={onDateChange}
          disabled={type === 'check'}
        />
      )}
    </div>
  )
}

const QualificationModal = props => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const {
    visible,
    handleCancel,
    handleOk,
    type,
    current = {},
    factoryId
  } = props
  const {
    certificationCode,
    certificationName,
    expiryDate = new Date().valueOf(),
    neverExpire,
    certificateImageURI
  } = current
  const newExpiryDate = neverExpire ? '1' : expiryDate
  const initialValues = {
    certificationCode,
    certificationName,
    expiryDate: newExpiryDate,
    qualification: certificateImageURI
  }
  const { commonStore, factoryPageStore } = useStores()
  const { dictionary } = commonStore
  const { factoryCertificate = [] } = toJS(dictionary)
  const { uploadFiles } = factoryPageStore
  const [imageUrl, setImageUrl] = useState<string>(certificateImageURI)
  const [loading, setLoading] = useState<boolean>(false)
  const [fileList, setFileList] = useState<any[]>([])

  useEffect(() => {
    if (certificateImageURI) {
      setFileList([{ thumbUrl: certificateImageURI }])
    }
  }, [certificateImageURI])

  const handleSelfOk = () => {
    validateFields().then(values => {
      let neverExpire
      if (values.expiryDate === '1') {
        neverExpire = 1
        delete values.expiryDate
      } else {
        neverExpire = 0
      }
      delete values.qualification
      axios
        .post('/api/factory/enterprise-qualification-certificate/update', {
          ...values,
          neverExpire,
          factoryId,
          certificateImageURI: imageUrl,
          status: 1,
          id: current.id
        })
        .then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          handleCancel()
          handleOk()
        })
    })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  const beforeUpload = file => {
    const isJpgOrPng =
      file.type === 'image/jpg' ||
      file.type === 'image/png' ||
      file.type === 'image/jpeg'
    if (!isJpgOrPng) {
      message.error('只能上传jpg/png格式文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('文件不能超过2M!')
    }
    return isJpgOrPng && isLt2M
  }

  const customRequest = async ({ file }) => {
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
    setImageUrl(undefined)
  }

  return (
    <Modal
      title={`${get(typeMap, type)}资质`}
      visible={visible}
      width={632}
      onOk={handleSelfOk}
      onCancel={handleCancel}
    >
      <Form
        {...layout}
        form={form}
        key={type === 'add' ? null : current.factoryId}
        name="certification"
        initialValues={initialValues}
      >
        <Form.Item
          label="资质名称"
          name="certificationName"
          rules={[{ required: true, message: '请选择资质名称！' }]}
        >
          <Select placeholder="请选择资质名称" disabled={type === 'check'}>
            {factoryCertificate.map(item => (
              <Option key={item.id} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="证书编号"
          name="certificationCode"
          rules={[{ required: true, message: '请输入证书编号!' }]}
        >
          <Input disabled={type === 'check'} placeholder="请输入证书编号" />
        </Form.Item>

        <Form.Item
          label="有效期"
          name="expiryDate"
          rules={[{ required: true, message: '请输入证书编号!' }]}
        >
          <PeriodValidity type={type} />
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

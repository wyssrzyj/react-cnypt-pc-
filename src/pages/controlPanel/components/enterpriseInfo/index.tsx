import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Cascader,
  Upload,
  message,
  Space
} from 'antd'
import { PlusOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import { toJS } from 'mobx'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import { useStores, observer } from '@/utils/mobx'
import BusinessAddressCom from '../businessAddressCom'
import Title from '../title'
import styles from './index.module.less'

const { TextArea } = Input

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 }
}
const itemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 17 }
}

const EnterpriseInfo = () => {
  const [form] = Form.useForm()
  const { validateFields, setFieldsValue } = form
  const currentUser = getCurrentUser() || {}
  const { mobilePhone, userId } = currentUser
  const { factoryPageStore, commonStore, loginStore } = useStores()
  const { userInfo } = loginStore
  const { uploadFiles } = factoryPageStore
  const { allArea } = commonStore
  // const [enterpriseType, setEnterpriseType] = useState<string>('')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageUrlList, setImageUrlList] = useState<any[]>([])
  const [enterpriseId, setEnterpriseId] = useState(undefined)
  const [factoryId, setFactoryId] = useState(undefined)
  const [enterpriseLogoId, setEnterpriseLogoId] = useState(undefined)
  const [preImageUrl, setPreImageUrl] = useState(undefined)

  // const onValuesChange = changedValues => {
  //   if (get(changedValues, 'enterpriseType')) {
  //     setEnterpriseType(changedValues.enterpriseType)
  //   }
  // }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
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
    const isLt2M = file.size / 1024 < 500
    if (!isLt2M) {
      message.error('文件不能超过500kb!')
    }
    return isJpgOrPng && isLt2M
  }

  const customRequest = async ({ file }) => {
    // const list = cloneDeep(fileList)
    const formData = new FormData()

    formData.append('file', file)
    formData.append('module', 'factory')
    const res = await uploadFiles(formData)
    setImageUrl(res)
    setImageUrlList([{ thumbUrl: res }])
  }

  const confirmSubmit = () => {
    validateFields().then(values => {
      const { area = [], businessAddress = {} } = values
      const { address, location } = businessAddress
      delete values.area
      delete values.businessAddress
      axios
        .post('/api/factory/enterprise/enterprise-info-save', {
          ...values,
          enterpriseLogoUrl: imageUrl === preImageUrl ? undefined : imageUrl,
          provinceId: area[0],
          cityId: area[1],
          districtId: area[2],
          address,
          latitude: location.split(',')[1],
          longitude: location.split(',')[0],
          enterpriseId,
          factoryId,
          userId,
          enterpriseLogoId:
            imageUrl === preImageUrl ? undefined : enterpriseLogoId
        })
        .then(response => {
          const { success, msg, data = {} } = response
          if (success) {
            // message.success('请完善企业证件认证，平台将在1~3个工作日与您取得联系，请注意接听来电。')
            message.success(msg)
            userInfo() //更新企业名称、企业id
            localStorage.setItem('enterpriseInfo', JSON.stringify(data))
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          } else {
            message.error(msg)
          }
        })
    })
  }
  const getEnterpriseInfo = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-info-user-id', { userId })
      .then(response => {
        const { success, data = {} } = response
        if (success && !isEmpty(data)) {
          const {
            enterpriseLogoUrl,
            factoryId,
            enterpriseId,
            provinceId,
            cityId,
            districtId,
            address,
            latitude,
            longitude,
            enterpriseLogoId
          } = data
          setImageUrl(enterpriseLogoUrl)
          setPreImageUrl(enterpriseLogoUrl)
          setFactoryId(factoryId)
          setEnterpriseId(enterpriseId)
          setEnterpriseLogoId(enterpriseLogoId)
          setFieldsValue({
            ...data,
            enterpriseLogoUrl,
            area: [
              provinceId.toString(),
              cityId.toString(),
              districtId.toString()
            ],
            businessAddress: { location: `${longitude},${latitude}`, address }
          })
        }
      })
  }
  useEffect(() => {
    getEnterpriseInfo()
  }, [])

  return (
    <div className={styles.enterpriseInfo}>
      <Form
        {...layout}
        form={form}
        colon={false}
        name="enterprise"
        labelAlign="left"
        initialValues={{
          mobilePhone: mobilePhone
        }}
        style={{ position: 'relative' }}
        // onValuesChange={onValuesChange}
      >
        <Title title={'基本信息'} />
        <Form.Item
          label="企业Logo "
          name="enterpriseLogoUrl"
          tooltip={{
            title: '只能上传jpg/png格式文件，限传一个文件不能超过500kb',
            icon: <InfoCircleOutlined />
          }}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={true}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
            fileList={imageUrlList}
            maxCount={1}
            onRemove={() => setImageUrlList([])}
          >
            {isEmpty(imageUrlList) ? uploadButton : null}
          </Upload>
        </Form.Item>

        <Form.Item
          label="企业名称"
          name="enterpriseName"
          rules={[{ required: true, message: '请输入企业名称！' }]}
          tooltip={{
            title: '企业名称务必与营业执照一致，如：广州某某信息科技有限公司',
            icon: <InfoCircleOutlined />
          }}
        >
          <Input placeholder="请输入企业名称" />
        </Form.Item>
        <div></div>

        <Form.Item
          label="企业类型"
          name="enterpriseType"
          rules={[{ required: true, message: '请选择企业类型！' }]}
        >
          <Radio.Group>
            <Space direction="vertical">
              <Radio value="0">
                <span>加工厂</span>{' '}
                <span className={styles.radioTip}>
                  （加工厂拥有接单的权限）
                </span>
              </Radio>
              <Radio value="1">
                <span>发单商</span>
                <span className={styles.radioTip}>
                  （发单商拥有发单的权限，无法接单）
                </span>
              </Radio>
            </Space>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="联系人"
          name="realName"
          rules={[{ required: true, message: '请填写联系人姓名' }]}
        >
          <Input placeholder="请填写联系人姓名" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="mobilePhone"
          rules={[{ required: true, message: '请填写手机号' }]}
        >
          <Input placeholder="请填写手机号" disabled />
        </Form.Item>

        <Form.Item label="电话号码" name="contactPhone">
          <Input placeholder="请输入座机号码  如：0571-8******" />
        </Form.Item>

        <Form.Item label="电子邮箱" name="email">
          <Input placeholder="请填写电子邮箱" />
        </Form.Item>

        <Form.Item
          label="所在地区"
          name="area"
          rules={[{ required: true, message: '请选择所在地' }]}
        >
          <Cascader options={toJS(allArea)} placeholder="请选择所在地" />
        </Form.Item>

        <Form.Item
          label="企业地址"
          {...itemLayout}
          name="businessAddress"
          rules={[{ required: true, message: '请选择企业地址！' }]}
        >
          <BusinessAddressCom />
        </Form.Item>

        <Form.Item
          label="企业简介"
          name="enterpriseDesc"
          rules={[
            { required: true, message: '请填写企业简介！' },
            { max: 700, min: 100 }
          ]}
        >
          <TextArea
            rows={4}
            placeholder="填写自主品牌名称、市场定位、销售网络和规模等信息，不要填写电话/邮箱等联系方式，字数在100-700之间"
          />
        </Form.Item>
      </Form>

      <div className={styles.enterpriseFooter}>
        <Button
          className={styles.button}
          type="primary"
          onClick={confirmSubmit}
        >
          确认{enterpriseId ? '修改' : '提交'}
        </Button>
      </div>
    </div>
  )
}

export default observer(EnterpriseInfo)

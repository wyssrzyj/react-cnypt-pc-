import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Radio, Cascader, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
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
  labelCol: { span: 4 },
  wrapperCol: { span: 16 }
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
            enterpriseName,
            enterpriseType,
            realName,
            contactPhone,
            email,
            enterpriseDesc,
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
            enterpriseLogoUrl,
            enterpriseName,
            enterpriseType,
            realName,
            contactPhone,
            email,
            enterpriseDesc,
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
        name="enterprise"
        initialValues={{
          mobilePhone: mobilePhone
        }}
        style={{ position: 'relative' }}
        // onValuesChange={onValuesChange}
      >
        <Title title={'基本信息'} />
        {/* <div className={styles.enterpriseTitle}>基本信息</div> */}
        <Form.Item label="企业Logo" name="enterpriseLogoUrl">
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
        <div className={styles.tipBox}>
          只能上传jpg/png格式文件，限传一个文件不能超过500kb
        </div>

        <Form.Item
          label="企业名称"
          name="enterpriseName"
          rules={[{ required: true, message: '请输入企业名称！' }]}
        >
          <Input placeholder="请输入企业名称" />
        </Form.Item>

        <Form.Item
          label="企业类型"
          name="enterpriseType"
          rules={[{ required: true, message: '请选择企业类型！' }]}
        >
          <Radio.Group>
            <Radio value="0">加工厂</Radio>
            <Radio value="1">发单商</Radio>
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

        {/* {enterpriseType === 'process' && (
          <>
            <Form.Item
              label="工厂类型"
              name="productionType"
              rules={[{ required: true, message: '请选择生产类型！' }]}
            >
              <Checkbox.Group options={typeOptions} />
            </Form.Item>

            <Form.Item
              label="主营类别"
              name="mainCategories"
              rules={[{ required: true, message: '请选择主营类别！' }]}
            >
              <MainCategoriesCom />
            </Form.Item>

            <Form.Item
              label="加工类型"
              name="processingType"
              rules={[{ required: true, message: '请选择加工类型！' }]}
            >
              <ProcessingTypeCom />
            </Form.Item>

            <Form.Item
              label="生产人数"
              name="productionNumber"
              rules={[{ required: true, message: '请选择生产人数！' }]}
            >
              <Select>
                {productionOptions.map(option => (
                  <Option key={option.value} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="空档期" name="gapYear">
              <RangePicker picker="month" />
            </Form.Item>

            <Form.Item label="加工介绍" name="processingIntroduced">
              <TextArea
                rows={4}
                placeholder="示例：300件起订  支持贴牌  可接外贸订单  来样加工"
              />
            </Form.Item>
          </>
        )} */}

        <Form.Item
          label="企业地址"
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
        {/* <div className={styles.enterpriseTitle}>联系方式</div> */}
      </Form>

      <div className={styles.enterpriseFooter}>
        <Button type="primary" onClick={confirmSubmit}>
          确认{enterpriseId ? '修改' : '提交'}
        </Button>
      </div>
    </div>
  )
}

export default observer(EnterpriseInfo)

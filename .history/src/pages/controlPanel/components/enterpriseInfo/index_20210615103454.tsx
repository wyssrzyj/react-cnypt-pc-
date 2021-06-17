import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  // Select,
  // DatePicker,
  Cascader,
  Upload,
  message
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import cityData from '@/static/cityData'
import { useStores } from '@/utils/mobx'
import BusinessAddressCom from '../businessAddressCom'
// import ProcessingTypeCom from '../processingTypeCom'
// import MainCategoriesCom from '../mainCategoriesCom'
import styles from './index.module.less'

// const { Option } = Select
// const { RangePicker } = DatePicker
const { TextArea } = Input

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}

// const typeOptions = [
//   { label: '小单快反', value: 'Apple' },
//   { label: '外贸工厂', value: 'Pear' },
//   { label: '清加工工厂', value: 'Orange' },
//   { label: '贴牌工厂', value: 'banana' }
// ]
// const productionOptions = [
//   { label: '20人以内', value: '20' },
//   { label: '20~50人', value: '50' },
//   { label: '50~100人', value: '100' },
//   { label: '101~500人', value: '500' },
//   { label: '501~1000人', value: '1000' },
//   { label: '1001~10000人', value: '10000' },
//   { label: '10000以上', value: '10001' }
// ]

// const InputComponent = props => {
//   const { text, disable = false, value } = props
//   return (
//     <div className={styles.inputComponent}>
//       <Input
//         style={{ width: 370 }}
//         value={value}
//         disabled={disable}
//         placeholder={text}
//       />
//       <Checkbox>不公开</Checkbox>
//     </div>
//   )
// }

const EnterpriseInfo = () => {
  const [form] = Form.useForm()
  const { validateFields } = form
  const currentUser = getCurrentUser() || {}
  const { mobilePhone } = currentUser
  const { factoryPageStore } = useStores()
  const { uploadFiles } = factoryPageStore
  // const [enterpriseType, setEnterpriseType] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  // const onValuesChange = changedValues => {
  //   if (get(changedValues, 'enterpriseType')) {
  //     setEnterpriseType(changedValues.enterpriseType)
  //   }
  // }

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
    const isLt2M = file.size / 1024 < 500
    if (!isLt2M) {
      message.error('文件不能超过500kb!')
    }
    return isJpgOrPng && isLt2M
  }

  const customRequest = async ({ file }) => {
    // const list = cloneDeep(fileList)
    setLoading(true)
    const formData = new FormData()

    formData.append('file', file)
    formData.append('module', 'factory')
    const res = await uploadFiles(formData)
    setImageUrl(res)
    setLoading(false)
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
  }

  return (
    <div className={styles.enterpriseInfo}>
      <Form
        {...layout}
        form={form}
        name="enterprise"
        initialValues={{
          mobilePhone: mobilePhone
        }}
        // onValuesChange={onValuesChange}
      >
        <div className={styles.enterpriseTitle}>基本信息</div>
        <Form.Item label="企业Logo" name="enterpriseLogoUrl">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            beforeUpload={beforeUpload}
            customRequest={customRequest}
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
          <Input placeholder="请输入企业名称" />
        </Form.Item>

        <Form.Item
          label="企业类型"
          name="enterpriseType"
          rules={[{ required: true, message: '请输入企业名称！' }]}
        >
          <Radio.Group>
            <Radio value="0">加工商</Radio>
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

        <Form.Item
          label="电话号码"
          name="contactPhone"
          rules={[{ required: true, message: '请填写电话号码' }]}
        >
          <Input placeholder="请输入座机号码  如：0571-8******" />
        </Form.Item>

        <Form.Item
          label="电子邮箱"
          name="email"
          rules={[{ required: true, message: '请填写电子邮箱' }]}
        >
          <Input placeholder="请填写电子邮箱" />
        </Form.Item>

        <Form.Item
          label="所在地区"
          name="area"
          rules={[{ required: true, message: '请选择所在地' }]}
        >
          <Cascader options={cityData} placeholder="请选择所在地" />
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
          name="enterpriseAbstract"
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
          确认提交
        </Button>
      </div>
    </div>
  )
}

export default EnterpriseInfo

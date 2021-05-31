import React, { useState } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Select,
  DatePicker,
  Cascader,
  Upload
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import { getCurrentUser } from '@/utils/tool'
import cityData from '@/static/cityData'
import ProcessingTypeCom from '../processingTypeCom'
import styles from './index.module.less'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 12 }
}

const typeOptions = [
  { label: '小单快反', value: 'Apple' },
  { label: '外贸工厂', value: 'Pear' },
  { label: '清加工工厂', value: 'Orange' },
  { label: '贴牌工厂', value: 'banana' }
]
const productionOptions = [
  { label: '20人以内', value: '20' },
  { label: '20~50人', value: '50' },
  { label: '50~100人', value: '100' },
  { label: '101~500人', value: '500' },
  { label: '501~1000人', value: '1000' },
  { label: '1001~10000人', value: '10000' },
  { label: '10000以上', value: '10001' }
]

const InputComponent = props => {
  const { text, disable = false, value } = props
  return (
    <div className={styles.inputComponent}>
      <Input
        style={{ width: 370 }}
        value={value}
        disabled={disable}
        placeholder={text}
      />
      <Checkbox>不公开</Checkbox>
    </div>
  )
}

const EnterpriseInfo = () => {
  const currentUser = getCurrentUser() || {}
  const { mobilePhone } = currentUser
  const [enterpriseType, setEnterpriseType] = useState<string>('process')
  const [loading, setLoading] = useState(false)
  const [imageUrl, setmageUrl] = useState('')

  const onValuesChange = (changedValues, allValues) => {
    console.log({ changedValues, allValues })
    if (get(changedValues, 'enterpriseType')) {
      setEnterpriseType(changedValues.enterpriseType)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  return (
    <div className={styles.enterpriseInfo}>
      <Form
        {...layout}
        name="enterprise"
        initialValues={{
          enterpriseType: enterpriseType,
          mobileNumber: mobilePhone
        }}
        onValuesChange={onValuesChange}
      >
        <div className={styles.enterpriseTitle}>基本信息</div>
        <Form.Item
          label="企业Logo"
          name="logo"
          rules={[{ required: true, message: '请上传企业logo' }]}
        >
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
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
            <Radio value="process">加工商</Radio>
            <Radio value="bill">发单商</Radio>
          </Radio.Group>
        </Form.Item>

        {enterpriseType === 'process' && (
          <>
            <Form.Item
              label="生产类型"
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
              <Checkbox.Group options={typeOptions} />
            </Form.Item>

            <Form.Item
              label="加工类型"
              name="processingType"
              rules={[{ required: true, message: '请选择加工类型！' }]}
            >
              <ProcessingTypeCom/>
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
          </ProcessingTypeCom>
        )}

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
        <div className={styles.enterpriseTitle}>联系方式</div>
        <Form.Item
          label="联系人"
          name="contact"
          rules={[{ required: true, message: '请填写联系人姓名' }]}
        >
          <InputComponent text="请填写联系人姓名" />
        </Form.Item>

        <Form.Item
          label="手机号"
          name="mobileNumber"
          rules={[{ required: true, message: '请填写手机号' }]}
        >
          <InputComponent text="请填写手机号" disable={true} />
        </Form.Item>

        <Form.Item
          label="电话号码"
          name="phoneNumber"
          rules={[{ required: true, message: '请填写电话号码' }]}
        >
          <InputComponent text="请填写电话号码" />
        </Form.Item>

        <Form.Item
          label="电子邮箱"
          name="email"
          rules={[{ required: true, message: '请填写电子邮箱' }]}
        >
          <InputComponent text="请填写电子邮箱" />
        </Form.Item>

        <Form.Item
          label="所在地区"
          name="area"
          rules={[{ required: true, message: '请选择所在地' }]}
        >
          <Cascader options={cityData} placeholder="请选择所在地" />
        </Form.Item>
      </Form>

      <div className={styles.enterpriseFooter}>
        <Button type="primary">确认提交</Button>
        <Button className={styles.cancelButton}>取消</Button>
      </div>
    </div>
  )
}

export default EnterpriseInfo

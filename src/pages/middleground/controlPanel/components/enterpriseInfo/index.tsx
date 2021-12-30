import React, { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Radio,
  Cascader,
  Upload,
  message,
  Space,
  Alert,
  Row,
  Col,
  DatePicker,
  Select,
  TreeSelect
} from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import { isEmpty, isArray, isNil } from 'lodash'
import { toJS } from 'mobx'
import { get } from 'lodash'
import Viewer from 'react-viewer'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import { useStores, observer } from '@/utils/mobx'
import BusinessAddressCom from '../businessAddressCom'
import Title from '../title'
import styles from './index.module.less'
import { cloneDeep } from 'lodash'
import { dealRefresh } from '@/utils/axios/filterNull'
// import ProcessingTypeCom from '../processingTypeCom'
import MainCategoriesCom from '../mainCategoriesCom'
import moment from 'moment'
import OSS from '@/utils/oss'
import { getChild } from './getChild'

const { TextArea } = Input
const { Option } = Select
const { SHOW_PARENT } = TreeSelect

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 }
}
const itemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 17 }
}

const statusMap = {
  0: 'error',
  1: 'success',
  2: 'warning',
  3: 'warning'
}

const productClassMap = [
  { value: 1, label: '低' },
  { value: 2, label: '中' },
  { value: 3, label: '中低' },
  { value: 3, label: '低中' },
  { value: 4, label: '高' },
  { value: 5, label: '高低' },
  { value: 5, label: '低高' },
  { value: 6, label: '高中' },
  { value: 6, label: '中高' },
  { value: 7, label: '高中低' },
  { value: 7, label: '高低中' },
  { value: 7, label: '低高中' },
  { value: 7, label: '低中高' },
  { value: 7, label: '中低高' },
  { value: 7, label: '中高低' }
]

const EnterpriseInfo = () => {
  const [form] = Form.useForm()
  const { validateFields, setFieldsValue, getFieldValue } = form
  const currentUser = getCurrentUser() || {}
  const { mobilePhone, userId } = currentUser

  const { commonStore, loginStore, demandListStore } = useStores()
  const { userInfo } = loginStore
  const { gradingOfProducts } = demandListStore

  const { allArea, dictionary } = commonStore
  const {
    plusMaterialType,
    purchaserRole,
    productType = [],
    processType = []
  } = toJS(dictionary)

  const [imageUrl, setImageUrl] = useState<string>('')
  const [imageUrlList, setImageUrlList] = useState<any[]>([])
  const [enterpriseId, setEnterpriseId] = useState(undefined)
  const [factoryId, setFactoryId] = useState(undefined)
  const [purchaserId, setPurchaserId] = useState(undefined)
  const [enterpriseLogoId, setEnterpriseLogoId] = useState(undefined)
  const [preImageUrl, setPreImageUrl] = useState(undefined)
  const [currentType, setCurrentType] = useState(undefined)
  const [messageMap, setMessageMap] = useState<any>({})
  const [visible, setVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [contactsId, setContactsId] = useState<string>(undefined)
  const [oldData, setOldData] = useState<any>({})
  const [enterpriseType, setEnterpriseType] = useState<any>()
  const [value, serValue] = useState([])
  const [treeData, setTreeData] = useState([])
  const [grades, setGrades] = useState([]) //用于判断档次方法是否执行
  const [loading, setLoading] = useState<boolean>(false)

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
    const res = await OSS.put(
      `/capacity-platform/platform/${file.uid}__${file.name}`,
      file
    )
    if (res) {
      const { url } = res
      setImageUrl(url)
      setImageUrlList([{ thumbUrl: url }])
    }
  }

  const confirmSubmit = () => {
    if (loading) return
    validateFields().then(values => {
      const {
        area = [],
        businessAddress = {},
        clothesGrade = []
        // factoryProcessTypeList
      } = values

      const { address, location } = businessAddress

      delete values.area
      delete values.businessAddress
      let flag = false
      if (oldData.enterpriseId) {
        if (oldData.enterpriseName !== values.enterpriseName) {
          flag = true
        }
        if (oldData.enterpriseType !== values.enterpriseType) {
          flag = true
        }
        if (
          +oldData.provinceId !== +area[0] ||
          +oldData.cityId !== +area[1] ||
          +oldData.districtId !== +area[2]
        ) {
          flag = true
        }
        if (oldData.address !== address) {
          flag = true
        }
        if (
          oldData.latitude !== location.split(',')[1] ||
          oldData.longitude !== location.split(',')[0]
        ) {
          flag = true
        }
      } else {
        flag = true
      }

      const grade = productClassMap.find(
        item => item.label === clothesGrade.join('')
      ) || { value: null }
      const newGrade = grade.value || null
      delete values.clothesGrade
      values.establishedTime = moment(values.establishedTime).valueOf()

      const params = {
        ...values,
        contactsId,
        enterpriseLogoUrl: imageUrl === preImageUrl ? undefined : imageUrl,
        provinceId: area[0],
        cityId: area[1],
        districtId: area[2],
        address,
        latitude: location.split(',')[1],
        longitude: location.split(',')[0],
        enterpriseId,
        factoryId,
        purchaserId,
        userId,
        isInfoApproval: flag ? 1 : 0,
        clothesGrade: newGrade,
        enterpriseInfoApproveId: oldData.enterpriseInfoApproveId,
        enterpriseLogoId:
          imageUrl === preImageUrl ? undefined : enterpriseLogoId
      }

      // 判断 提交的值和回显的值是否一样 一样的话就修改,
      if (!isEmpty(grades)) {
        let judgment = [
          'productGradeHigh',
          'productGradeMiddle',
          'productGradeLow'
        ]
        if (grades[0] === params.productGradeValues[0]) {
        } else {
          if (params.productGradeValues) {
            params.productGradeValues = getChild(
              params.productGradeValues,
              judgment,
              treeData
            )
          }
        }
      }
      setLoading(true)
      axios
        .post('/api/factory/enterprise/enterprise-info-save', params)
        .then(async response => {
          const { success, msg, data = {} } = response
          if (success) {
            message.success(msg)
            const res = await userInfo() //更新企业名称、企业id

            localStorage.setItem('enterpriseInfo', JSON.stringify(data))
            !res.data.enterpriseId && (await dealRefresh())

            setTimeout(() => {
              window.location.reload()
            }, 500)
          } else {
            message.error(msg)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    })
    setLoading(false)
  }

  const getEnterpriseInfo = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-info', {})
      .then(response => {
        const { success, data = {} } = response

        setGrades(data.productGradeValues)
        console.log('产品档次接口回显数据', data.productGradeValues)
        if (success && !isEmpty(data)) {
          const {
            enterpriseLogoUrl,
            factoryId, //加工厂
            purchaserId, //发单商
            enterpriseId,
            provinceId,
            cityId,
            districtId,
            address,
            latitude,
            longitude,
            enterpriseLogoId,
            contactsId,
            clothesGrade,
            enterpriseType
          } = data
          const keys = Reflect.ownKeys(data)
          if (keys.includes('roleCodes')) {
            data['roleCodes'] = data['roleCodes'] || []
          }
          if (keys.includes('materialTypeValues')) {
            data['materialTypeValues'] = data['materialTypeValues'] || []
          }

          data.establishedTime = data.establishedTime
            ? moment(data.establishedTime)
            : null
          const grade = productClassMap.find(
            item => item.value === clothesGrade
          ) || { label: '' }

          setOldData(cloneDeep(data))
          setContactsId(contactsId)
          if (enterpriseLogoUrl) {
            setImageUrl(enterpriseLogoUrl)
            setImageUrlList([{ thumbUrl: enterpriseLogoUrl }])
            setPreImageUrl(enterpriseLogoUrl)
          }
          setFactoryId(factoryId)
          setPurchaserId(purchaserId)
          setEnterpriseId(enterpriseId)
          setEnterpriseLogoId(enterpriseLogoId)
          setEnterpriseType(enterpriseType)
          setFieldsValue({
            ...data,
            enterpriseLogoUrl,
            clothesGrade: grade.label.split(''),
            businessAddress: { location: `${longitude},${latitude}`, address }
          })
          if (provinceId) {
            setFieldsValue({
              area: [
                provinceId ? provinceId.toString() : undefined,
                cityId ? cityId.toString() : undefined,
                districtId ? districtId.toString() : undefined
              ]
            })
          }
        }
        if (data.productGradeValues === null) {
          form.setFieldsValue({ productGradeValues: undefined })
        }
        if (data.productTypeValues === null) {
          form.setFieldsValue({ productTypeValues: undefined })
        }
        if (data.processTypeList === null) {
          form.setFieldsValue({ processTypeList: undefined })
        }
        form.setFieldsValue({ productGradeValues: data.productGradeValues })
      })
  }

  const getApprovalResult = () => {
    axios
      .get('/api/factory/enterprise/get-enterprise-info-approval-result', {
        enterpriseId: enterpriseId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { approvalStatus, approvalDesc = '' } = data

          setCurrentType(approvalStatus)
          setMessageMap({
            0: (
              <span>
                很抱歉通知您，您的平台入驻审批失败，失败原因：{approvalDesc}
              </span>
            ),
            1: '恭喜您入驻信息审批通过，平台功能已为您开放，祝您上网愉快。',
            2: '平台已收到您的入驻信息，请注意接听来电，我们将在1~3个工作日与您取得联系。',
            3: '平台已收到您的入驻信息，请注意接听来电，我们将在1~3个工作日与您取得联系。'
          })
        }
      })
  }

  const handlePreview = file => {
    if (file.thumbUrl) {
      setVisible(true)
      setPreviewImage(file.thumbUrl)
    }
  }

  const onValuesChange = values => {
    const keys = Reflect.ownKeys(values)
    if (keys.includes('enterpriseType')) {
      setEnterpriseType(values['enterpriseType'])
    }
  }

  useEffect(() => {
    if (enterpriseId) {
      getApprovalResult()
    }
  }, [enterpriseId])

  useEffect(() => {
    getEnterpriseInfo()
  }, [])

  useEffect(() => {
    if (+enterpriseType === 1) {
      form.setFieldsValue({
        roleCodes: form.getFieldValue('roleCodes') || []
      })
    }
  }, [enterpriseType])
  useEffect(() => {
    grade()
  }, [])
  const grade = async () => {
    let res = await gradingOfProducts() //订单档次
    console.log(res)
    setTreeData(res.data)
  }

  const onChange = value => {
    //获取所有的父节点
    serValue(value)
  }
  const tProps = {
    treeData,
    value: value,
    onChange: onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: '请选择产品档次',
    style: {
      width: '100%'
    }
  }

  return (
    <div className={styles.enterpriseInfoContent}>
      {currentType && (
        <Alert
          banner
          className={styles.topTip}
          message={get(messageMap, currentType)}
          type={get(statusMap, currentType)}
          showIcon
        />
      )}
      <div className={styles.enterpriseInfo}>
        <Title title={'基本信息'} />
        <Form
          {...layout}
          form={form}
          colon={false}
          // size="large"
          name="enterprise"
          labelAlign="left"
          initialValues={{
            mobilePhone: mobilePhone
          }}
          style={{ position: 'relative' }}
          onValuesChange={onValuesChange}
        >
          <Form.Item
            label={<span className={styles.formLabel}>企业Logo</span>}
            name="enterpriseLogoUrl"
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
              onPreview={handlePreview}
            >
              {isEmpty(imageUrlList) ? uploadButton : null}
            </Upload>
          </Form.Item>
          <Row>
            <Col className="gutter-row" span={3}></Col>
            <Col className="gutter-row" span={14}>
              <div className={styles.tip}>
                <Icon type="jack-jingshi1" />
                {'    '}
                只能上传jpg/png格式文件，限传一个文件不能超过500kb
              </div>
            </Col>
          </Row>
          <Form.Item
            label="企业名称"
            name="enterpriseName"
            rules={[{ required: true, message: '请输入企业名称！' }]}
          >
            <Input className={styles.input} placeholder="请输入企业名称" />
          </Form.Item>
          <Row className={styles.nameTip}>
            <Col className="gutter-row" span={3}></Col>
            <Col className="gutter-row" span={14}>
              <div className={styles.tip}>
                <Icon type="jack-jingshi1" />
                企业名称务必与营业执照一致，如：广州某某信息科技有限公司
              </div>
            </Col>
          </Row>
          {/* TODO: 字段名称*/}
          <Form.Item
            label="成立时间"
            name="establishedTime"
            rules={[{ required: true, message: '请选择成立时间！' }]}
          >
            <DatePicker
              placeholder={'请选择成立时间'}
              style={{ width: '100%' }}
            ></DatePicker>
          </Form.Item>
          <Form.Item
            label="企业类型"
            name="enterpriseType"
            rules={[{ required: true, message: '请选择企业类型！' }]}
          >
            <Radio.Group>
              <Space direction="vertical">
                <Radio value="0">
                  <span>加工厂</span>
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
            label="主营类别"
            name="mainCategoriesList"
            rules={[{ required: true, message: '请选择主营类别' }]}
          >
            <MainCategoriesCom />
          </Form.Item>
          <Form.Item label="类别说明" name="mainProductCategoriesDesc">
            <Input placeholder="请输入类别说明" />
          </Form.Item>
          {/* TODO: 加工厂 */}
          {!isNil(enterpriseType) && +enterpriseType === 0 && (
            <>
              <Form.Item
                label="厂房面积"
                name="factoryArea"
                rules={[
                  { required: true, message: '请输入厂房面积！' },
                  {
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入数字'
                  }
                ]}
              >
                <Input addonAfter="平米" placeholder="请输入厂房面积！" />
              </Form.Item>

              <Form.Item
                label="生产线"
                name="productLineNum"
                rules={[
                  { required: true, message: '请输入生产线' },
                  {
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入数字'
                  }
                ]}
              >
                <Input addonAfter="条" placeholder="请输入生产线" />
              </Form.Item>

              <Form.Item
                label="有效车位"
                name="effectiveLocation"
                rules={[
                  { required: true, message: '请输入有效车位' },
                  {
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入数字'
                  }
                ]}
              >
                <Input placeholder="请选择有效车位" addonAfter="个" />
              </Form.Item>

              <Form.Item
                label="员工总数"
                name="staffNumber"
                rules={[
                  { required: true, message: '请输入员工总数' },
                  {
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入数字'
                  }
                ]}
              >
                <Input placeholder="请输入员工总数" addonAfter="人" />
              </Form.Item>
              <Form.Item
                label="产品档次"
                name="productGradeValues"
                rules={[{ required: true, message: '请选择产品档次' }]}
              >
                <TreeSelect maxTagCount={5} allowClear={true} {...tProps} />
              </Form.Item>

              <Form.Item
                label="生产方式"
                name="productTypeValues"
                rules={[{ required: true, message: '请选择生产方式！' }]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  style={{ width: '100%' }}
                  placeholder="请选择生产方式"
                >
                  {toJS(productType).map(option => (
                    <Option key={option.value + 'mode'} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="面料类型"
                name="materialTypeValues"
                rules={[{ required: true, message: '请选择面料类型' }]}
              >
                <Select placeholder={'请选择面料类型'} mode={'multiple'}>
                  {isArray(plusMaterialType) &&
                    plusMaterialType.map(item => (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="加工类型"
                name="processTypeList"
                rules={[{ required: true, message: '请选择加工类型！' }]}
              >
                <Select placeholder={'请选择加工类型'} mode={'multiple'}>
                  {isArray(processType) &&
                    processType.map(item => (
                      <Option value={item.value} key={item.id}>
                        {item.label}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="起订量"
                name="moq"
                rules={[
                  { required: true, message: '请输入起订量' },
                  {
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入数字'
                  }
                ]}
              >
                <Input placeholder={'请输入起订量'} addonAfter={'件'} />
              </Form.Item>
            </>
          )}

          {/* TODO: 发单商 */}
          {!isNil(enterpriseType) && +enterpriseType === 1 && (
            <>
              <Form.Item
                label="企业角色"
                name="roleCodes"
                rules={[{ required: true, message: '请选择企业角色' }]}
              >
                <Select placeholder={'请选择企业角色'} mode={'multiple'}>
                  {isArray(purchaserRole) &&
                    purchaserRole.map(item => (
                      <Option value={item.value} key={item.value}>
                        {item.label}
                      </Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label="年发单量"
                name="yearOrderTransaction"
                rules={[
                  { required: true, message: '请输入年发单量（万件）' },
                  {
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入数字'
                  }
                ]}
              >
                <Input placeholder="请输入年发单量（万件）" addonAfter="万件" />
              </Form.Item>
              <Form.Item label="订单品牌" name="orderBrand">
                <Input placeholder="请输入订单品牌" />
              </Form.Item>
            </>
          )}

          <Form.Item
            label="联系人"
            name="contactsName"
            rules={[{ required: true, message: '请输入联系人姓名' }]}
          >
            <Input className={styles.input} placeholder="请输入联系人姓名" />
          </Form.Item>
          <Form.Item
            label="手机号"
            name="mobilePhone"
            rules={[{ required: true, message: '请输入手机号' }]}
          >
            <Input
              className={styles.input}
              placeholder="请输入手机号"
              disabled
            />
          </Form.Item>
          <Form.Item
            label={<span className={styles.formLabel}>电话号码</span>}
            name="contactPhone"
          >
            <Input
              className={styles.input}
              placeholder="请输入座机号码  如：0571-8******"
            />
          </Form.Item>
          <Form.Item
            label={<span className={styles.formLabel}>电子邮箱</span>}
            name="email"
          >
            <Input className={styles.input} placeholder="请填写电子邮箱" />
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
            <BusinessAddressCom
              className={styles.input}
              getFieldValue={getFieldValue}
              field={'area'}
            />
          </Form.Item>
          <Form.Item
            label="企业简介"
            name="enterpriseDesc"
            rules={[
              { required: true, message: '请填写企业简介！' },
              { max: 700 }
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
      <Viewer
        visible={visible}
        noFooter={true}
        onMaskClick={() => {
          setVisible(false)
        }}
        onClose={() => {
          setVisible(false)
        }}
        images={[{ src: previewImage }]}
      />
    </div>
  )
}

export default observer(EnterpriseInfo)

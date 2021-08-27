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
  Col
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'
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
// import './style.less'

const { TextArea } = Input

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

const EnterpriseInfo = () => {
  const [form] = Form.useForm()
  const { validateFields, setFieldsValue, getFieldValue } = form
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
  const [purchaserId, setPurchaserId] = useState(undefined)
  const [enterpriseLogoId, setEnterpriseLogoId] = useState(undefined)
  const [preImageUrl, setPreImageUrl] = useState(undefined)
  const [currentType, setCurrentType] = useState(undefined)
  const [messageMap, setMessageMap] = useState<any>({})
  const [visible, setVisible] = useState<boolean>(false)
  const [previewImage, setPreviewImage] = useState<string>('')
  const [contactsId, setContactsId] = useState<string>(undefined)
  const [oldData, setOldData] = useState<any>({})

  // const messageMap = {
  //   0: (
  //     <span>
  //       很抱歉通知您，您的平台入驻审批失败，
  //     </span>
  //   ),
  //   1: '恭喜您入驻信息审批通过，平台功能已为您开放，祝您上网愉快。',
  //   2: '平台已收到您的入驻信息，请注意接听来电，我们将在1~3个工作日与您取得联系。',
  //   3: '平台已收到您的入驻信息，请注意接听来电，我们将在1~3个工作日与您取得联系。'
  // }

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
        enterpriseLogoId:
          imageUrl === preImageUrl ? undefined : enterpriseLogoId
      }
      axios
        .post('/api/factory/enterprise/enterprise-info-save', params)
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
            contactsId
          } = data
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
          setFieldsValue({
            ...data,
            enterpriseLogoUrl,
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
          const { infoApprovalStatus, approvalDesc = '' } = data
          setCurrentType(infoApprovalStatus)
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

  useEffect(() => {
    if (enterpriseId) {
      getApprovalResult()
    }
  }, [enterpriseId])

  useEffect(() => {
    getEnterpriseInfo()
  }, [])

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
          // onValuesChange={onValuesChange}
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
            <Input placeholder="请输入企业名称" />
          </Form.Item>
          <Row className={styles.nameTip}>
            <Col className="gutter-row" span={3}></Col>
            <Col className="gutter-row" span={14}>
              <div className={styles.tip}>
                <Icon type="jack-jingshi1" />
                {'    '}
                企业名称务必与营业执照一致，如：广州某某信息科技有限公司
              </div>
            </Col>
          </Row>
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
            name="contactsName"
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
            label={<span className={styles.formLabel}>电话号码</span>}
            name="contactPhone"
          >
            <Input placeholder="请输入座机号码  如：0571-8******" />
          </Form.Item>
          <Form.Item
            label={<span className={styles.formLabel}>电子邮箱</span>}
            name="email"
          >
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
            <BusinessAddressCom getFieldValue={getFieldValue} field={'area'} />
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

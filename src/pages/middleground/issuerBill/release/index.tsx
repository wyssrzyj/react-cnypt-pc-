import React, { useEffect, useState } from 'react'
import { isArray } from 'lodash'
import Title from './title/index'
import { Form, Button } from 'antd'
import styles from './index.module.less'
import Basics from './components/basics'
import Commodity from './components/commodity'
import Terms from './components/terms'
import Address from './components/address'
import { useStores, observer, toJS } from '@/utils/mobx'
import { useHistory, useLocation } from 'react-router-dom'
import moment from 'moment'

const DemandSheet = () => {
  const location = useLocation()
  const { push } = useHistory()
  const [form] = Form.useForm()
  const { state } = location

  const { demandListStore } = useStores()
  const {
    ewDemandDoc,
    sendRequisition,
    anotherSingleInterface,
    regionalData,
    popUpEcho
  } = demandListStore

  const [confirm, setConfirm] = useState<any>(true)
  const [initialValues, setInitialValues] = useState<any>({
    isEnterpriseInfoPublic: 1,
    isPointSend: 0,
    isContactPublic: 1
  })
  const [stated, setStated] = useState<any>(state) //url 数据
  const { factoryStore } = useStores()
  const [invalid, setInvalid] = useState<any>('') //时间回显判断失效时间错
  const { productCategory } = factoryStore
  // 弹窗地区数据回显
  useEffect(() => {
    let arr = toJS(regionalData) //把id和name修改value和label
    if (arr.length > 0) {
      let sum = []
      arr.forEach(item => {
        sum.push(item.id)
      })
      form.setFieldsValue({ regionalIdList: sum })
    }
  }, [regionalData])

  useEffect(() => {
    api()
  }, [])
  let api = async () => {
    await productCategory()
  }

  useEffect(() => {
    setStated(state)
    if (stated) {
      echoData(stated.id)
    }
  }, [])

  const echoData = async v => {
    const { data } = await anotherSingleInterface({ id: v })

    if (data) {
      data.stylePicture = data.stylePicture.map(url => ({
        thumbUrl: url,
        url: url,
        name: url.split('__')[1]
      }))
      data.annex = data.annex.map(url => ({
        thumbUrl: url,
        url: url,
        name: url.split('__')[1]
      }))
      if (data.regionalIdList) {
      } else {
        data.regionalIdList = ['0'] //全国
      }
      if (data.location[0] === 0) {
        data.location = null
      }
      data.inquiryEffectiveDate = moment(data.inquiryEffectiveDate) //订单有效期时间的回显
      data.deliveryDate = moment(data.deliveryDate)
      setInvalid(moment(data.inquiryEffectiveDate).valueOf()) //订单有效期时间的时间戳.
    }

    popUpEcho(data.regionalIdList) //地区弹窗回显

    setInitialValues(data)
  }
  useEffect(() => {
    if (initialValues) {
      form.resetFields()
    }
  }, [initialValues])

  //保存
  const draft = () => {
    setConfirm(false)
  }
  //发布
  const release = () => {
    setConfirm(true)
  }

  const onFinish = async v => {
    //日期
    v.inquiryEffectiveDate = moment(v.inquiryEffectiveDate).valueOf() //需求有效期
    v.deliveryDate = moment(v.deliveryDate).valueOf() //交货期
    if (isArray(v.annex)) {
      v.annex = v.annex.map(item => item.url)
    }
    // 图片
    if (isArray(v.stylePicture)) {
      v.stylePicture = v.stylePicture.map(item => item.url)
    }
    //提交的状态
    if (confirm) {
      v.status = 1
    } else {
      v.status = -1
    }
    if (v.location) {
      v.provinceId = v.location[1]
      v.cityId = v.location[0]
      v.districtId = v.location[2]
    }

    if (stated) {
      if (stated.modify) {
        v.id = stated.id
      }
    }
    const res = await ewDemandDoc(v)
    // {supplierTenantId:v.supplierTenantId, status:1,purchaseInquiryId:res.data}.
    // sendRequisition
    console.log(res)

    if (res.code === 200) {
      if (v.isPointSend === 0) {
        push({ pathname: '/control-panel/issuerBill/demand-list' })
      } else {
        await sendRequisition({
          supplierTenantId: v.supplierTenantId,
          status: 1,
          purchaseInquiryId: res.data
        })

        push({ pathname: '/control-panel/issuerBill/demand-list' })
      }
    }
  }

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 }
  }
  return (
    <div className={styles.demand}>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={initialValues}
        {...layout}
      >
        <section>
          <Title title={'基础信息'}></Title>
          <Basics initialValues={initialValues} />
        </section>
        <section className={styles.commodity}>
          <Title title={'商品信息'}></Title>
          <Commodity />
        </section>
        <section>
          <Title title={'其他'}></Title>
          <Terms time={invalid} />
          <Address />
        </section>

        <div className={styles.formConfirm}>
          <Button className={styles.button} onClick={draft} htmlType={'submit'}>
            保存草稿
          </Button>
          <Button
            className={styles.button2}
            type={'primary'}
            onClick={release}
            htmlType={'submit'}
          >
            确认发布
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default observer(DemandSheet)

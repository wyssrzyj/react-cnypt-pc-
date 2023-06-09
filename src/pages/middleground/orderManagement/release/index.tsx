import React, { useEffect, useState } from 'react'
import { isArray } from 'lodash'
import Title from './title/index'
import { Form, Button } from 'antd'
import styles from './index.module.less'
import Basics from './components/basics'
import Commodity from './components/commodity'
import Terms from './components/terms'
import Address from './components/address'
import { useStores, observer } from '@/utils/mobx'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const DemandSheet = () => {
  const location = useLocation()
  const { push } = useHistory()
  const [form] = Form.useForm()
  const { state } = location

  const { demandListStore } = useStores()
  const { ewDemandDoc, anotherSingleInterface } = demandListStore

  const [validity, setValidity] = useState<any>()
  const [confirm, setConfirm] = useState<any>(true)
  const [initialValues, setInitialValues] = useState<any>({
    isEnterpriseInfoPublic: 1,
    isContactPublic: 1
  })
  const [stated, setStated] = useState<any>(state) //url 数据

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
      // data.processingType = moment(timestampToTime(data.inquiryEffectiveDate))//时间的回显
      // data.unitPrice = moment(timestampToTime(data.deliveryDate))
    }

    setInitialValues(data)
  }
  useEffect(() => {
    if (initialValues) {
      form.resetFields()
    }
  }, [initialValues])

  const data = value => {
    setValidity(value)
  }

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
    v.inquiryEffectiveDate = new Date(validity.processingType).getTime() //需求有效期
    v.deliveryDate = new Date(validity.unitPrice).getTime() //交货期
    if (isArray(v.annex)) {
      v.annex = v.annex.map(item => item.url)
    }
    // ly
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
    if (res.code === 200) {
      push({ pathname: '/control-panel/issuerBill/demand-list' })
    }
  }

  return (
    <div className={styles.demand}>
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <section>
          <Title title={'基础信息'}></Title>
          <Basics />
        </section>
        <section className={styles.commodity}>
          <Title title={'产品信息'}></Title>

          <Commodity />
        </section>
        <section>
          <Title title={'其他'}></Title>
          <Terms data={data} />
          <Address />
        </section>

        <div className={styles.formConfirm}>
          <Button className={styles.button} onClick={draft} htmlType={'submit'}>
            保存草稿
          </Button>
          <Button
            className={styles.button}
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

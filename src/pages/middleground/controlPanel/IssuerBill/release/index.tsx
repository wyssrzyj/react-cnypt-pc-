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
import { timestampToTime } from './components/time'
import { useLocation } from 'react-router-dom'
import moment from 'moment' //引入moment

const DemandSheet = () => {
  const location = useLocation()
  const { demandListStore } = useStores()
  const { ewDemandDoc, AnotherSingleInterface } = demandListStore

  const [validity, setValidity] = useState<any>()
  const [confirm, setConfirm] = useState<any>(true)
  const [initialValues, setInitialValues] = useState<any>({})

  const { push } = useHistory()
  const [form] = Form.useForm()
  const { search } = location

  useEffect(() => {
    const searchURL = new URLSearchParams(search)
    const id = searchURL.get('id')
    if (id) {
      echoData(id)
    }
  }, [])
  const echoData = async v => {
    const { data } = await AnotherSingleInterface({ id: v })
    console.log(data)
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
      data.processingType = moment(timestampToTime(data.inquiryEffectiveDate))
      data.unitPrice = moment(timestampToTime(data.deliveryDate))
    }
    console.log(data.regionalIdList)
    // data.regionalIdList = []
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
    const res = await ewDemandDoc(v)
    console.log(res)
    if (res.code === 200) {
      push({ pathname: '/control-panel/panel/demand-list' })
    }
  }

  return (
    <div className={styles.demand}>
      <Form form={form} onFinish={onFinish} initialValues={initialValues}>
        <h1>发布订单</h1>
        <section>
          <Title title={'基础信息'}></Title>
          <Basics />
        </section>
        <section className={styles.commodity}>
          <Title title={'产品信息'}></Title>
          <Commodity />
          <span className={styles.payment}>
            上传款图，只能上传jpg/png格式文件，文件不能超过20M，最多上传10个文件
          </span>
        </section>
        <section>
          <Title title={'交易条件'}></Title>
          <Terms data={data} />
        </section>
        <section>
          <Title title={'地址与联系人'}></Title>
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

import React, { useEffect, useState } from 'react'
import Title from './title/index'
import OrderReceiving from './components/orderReceiving'
import Basics from './components/basics'
import Commodity from './components/commodity'
import Terms from './components/terms'
import Address from './components/address'
import { useLocation } from 'react-router-dom'
import { useStores } from '@/utils/mobx'
import styles from './index.module.less'
import { getUserInfo } from '@/utils/tool'

const OrderDetails = () => {
  const userInfo = getUserInfo() || {}
  const { enterpriseType } = userInfo //0 加工厂 1 发单商
  const location = useLocation()
  const { state } = location

  const { demandListStore } = useStores()
  const { AnotherSingleInterface } = demandListStore
  const [initialValues, setInitialValues] = useState<any>({})
  const [stated, setStated] = useState<any>(state)
  useEffect(() => {
    setStated(state)
    if (stated.id) {
      echoData(stated.id)
    }
  }, [])

  const echoData = async v => {
    const { data } = await AnotherSingleInterface({ id: v })
    console.log(data)

    setInitialValues(data)
  }
  return (
    <div>
      <h1>订单详情</h1>
      <div className={styles.subject}>
        <section>
          <Title title={'基础信息'}></Title>
          <Basics initialValues={initialValues} />
        </section>
        <section>
          <Title title={'商品信息'}></Title>
          <Commodity initialValues={initialValues} />
        </section>
        <section>
          <Title title={'其他'}></Title>
          <Terms initialValues={initialValues} />
          {initialValues.isContactPublic === 1 ? (
            <Address initialValues={initialValues} />
          ) : null}
        </section>
      </div>
      {/* 0 加工厂 1 发单商   只有加工厂才能看到form */}
      {+enterpriseType === 1 ? (
        <div className={styles.form}>
          <section>
            <Title title={'填写接单内容'}></Title>
            <OrderReceiving stated={stated} />
          </section>
        </div>
      ) : null}
    </div>
  )
}

export default OrderDetails

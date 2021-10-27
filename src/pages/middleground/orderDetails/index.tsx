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
import { Icon } from '@/components' //路径
import { useHistory } from 'react-router-dom'

const OrderDetails = () => {
  const { go } = useHistory()
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
  const gos = () => {
    console.log('返回')
    go(-1)
  }

  const echoData = async v => {
    const { data } = await AnotherSingleInterface({ id: v })
    console.log(data)

    setInitialValues(data)
  }
  return (
    <div>
      <div className={styles.top}>
        <div className={styles.go} onClick={gos}>
          <Icon type="jack-left-copy" className={styles.prev} />
          接单详情
        </div>
      </div>
      <div className={styles.subject}>
        {/* 基础信息是否公开 */}
        <section>
          <Title title={'基础信息'}></Title>
          <Basics
            enterpriseType={enterpriseType}
            initialValues={initialValues}
          />
        </section>

        <section>
          <Title title={'商品信息'}></Title>
          <Commodity initialValues={initialValues} />
        </section>
        <section>
          <Title title={'其他'}></Title>
          <Terms initialValues={initialValues} />
          {/* 地址是否公开 */}
          {+enterpriseType === 1 ? (
            <Address initialValues={initialValues} />
          ) : (
            <div>
              {initialValues.isContactPublic === 1 ? (
                <div>
                  <Address initialValues={initialValues} />
                </div>
              ) : null}
            </div>
          )}
        </section>
      </div>

      {/* 0 加工厂 1 发单商   只有加工厂才能看到form */}
      {+enterpriseType === 0 ? (
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

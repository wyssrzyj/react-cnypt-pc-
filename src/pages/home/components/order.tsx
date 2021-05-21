import React, { useEffect } from 'react'
import styles from './order.module.less'
import { observer, useStores } from '@/utils/mobx'
import { Button } from 'antd'

const Order = () => {
  const { homeStore } = useStores()
  const {} = homeStore

  const list = [
    {
      type: '童装',
      count: 10000,
      way: '清加工',
      market: '外销',
      address: '四川省 成都市',
    },
    {
      type: '童装',
      count: 10000,
      way: '清加工',
      market: '外销',
      address: '四川省 成都市',
    },
    {
      type: '童装',
      count: 10000,
      way: '清加工',
      market: '外销',
      address: '四川省 成都市',
    },
    {
      type: '童装',
      count: 10000,
      way: '清加工',
      market: '外销',
      address: '四川省 成都市',
    },
  ]

  useEffect(() => {
    ;(async () => {})()
  }, [])

  return (
    <div className={styles.order}>
      <div className={styles.orderHeader}>
        <img src={''} alt="" className={styles.orderImg} />
        <div className={styles.orderHeaderContent}>
          <div>优质订单</div>
          <div>
            <span>381,234</span>
            <span>个客户在此录入</span>
            <span>3,381,234</span>
          </div>
        </div>
        <Button>全部订单</Button>
      </div>
      <div className={styles.orderContent}>
        {list.map((item, idx) => {
          return (
            <div key={idx}>
              <span className={styles.type}>{item.type}</span>
              <span className={styles.count}>{item.count}件</span>
              <span className={styles.way}>{item.way}</span>
              <span className={styles.market}>{item.market}</span>
              <span className={styles.address}>{item.address}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default observer(Order)

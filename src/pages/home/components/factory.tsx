import React, { useEffect } from 'react'
import styles from './order.module.less'
import { observer, useStores } from '@/utils/mobx'
import { Button } from 'antd'

const Factory = () => {
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
          <div>找工厂</div>
          <div>
            <span>累计注册</span>
            <span>1,234</span>
            <span>家服装工厂</span>
          </div>
        </div>
        <Button>全部工厂</Button>
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

export default observer(Factory)

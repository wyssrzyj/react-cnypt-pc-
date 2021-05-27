import React from 'react'
import styles from './areaChunk.module.less'
import { FactorySearch } from '../../factoryPage/components/typeFactory'

const Card = props => {
  const { title, createTime, type, count } = props

  return (
    <div className={styles.card}>
      <img src={''} className={styles.cardImg} alt="" />
      <div className={styles.cardInfo}>
        <div className={styles.title}>{title}</div>
        <div className={styles.text}>{createTime}</div>
        <div className={styles.text2}>
          <span>{type}</span>
          <span>{count}件</span>
        </div>
      </div>
    </div>
  )
}

const OrderChunk = () => {
  const title = '按品类查订单'

  const list = [
    {
      title: '女装外套',
      createTime: '2021-05-13',
      type: '轻加工轻加工轻加工轻加工',
      count: 10000
    },
    {
      title: '女装外套',
      createTime: '2021-05-13',
      type: '轻加工',
      count: 10000
    },
    {
      title: '女装外套',
      createTime: '2021-05-13',
      type: '轻加工',
      count: 10000
    },
    {
      title: '女装外套',
      createTime: '2021-05-13',
      type: '轻加工',
      count: 10000
    },
    {
      title: '女装外套',
      createTime: '2021-05-13',
      type: '轻加工',
      count: 10000
    },
    {
      title: '女装外套',
      createTime: '2021-05-13',
      type: '轻加工',
      count: 10000
    }
  ]

  return (
    <div className={styles.orderChunk}>
      <FactorySearch title={title} />
      <div className={styles.cards}>
        <div className={styles.chunkTitle}>最新订单</div>
        <div>
          {list.map((item, idx) => (
            <Card {...item} key={idx} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderChunk

import React from 'react'
import styles from '../index.module.less'
import ONLINE_HOT from '../img/onlineHot.png'

const ExcellentOrder = () => {
  const list = [
    {
      img: ONLINE_HOT,
      url: '',
      title: '男装T恤针织制衣1000件 金华市恒鑫玩具有限公司',
      address: '',
      total: '10000',
      unit: '100',
    },
    {
      img: ONLINE_HOT,
      url: '',
      title: '男装T恤针织制衣1000件 金华市恒鑫玩具有限公司',
      address: '',
      total: '10000',
      unit: '100',
    },
    {
      img: ONLINE_HOT,
      url: '',
      title: '男装T恤针织制衣1000件 金华市恒鑫玩具有限公司',
      address: '',
      total: '10000',
      unit: '100',
    },
  ]

  return (
    <div className={styles.excellentOrder}>
      <div className={styles.homeTitle}>优秀订单展示</div>
      <div className={styles.orderContent}>
        {list.map((item, idx) => {
          return (
            <div key={idx} className={styles.orderItem}>
              <img src={item.img} alt="" className={styles.orderImg} />
              <div>
                <div className={styles.orderTitle}>{item.title}</div>
                <div className={styles.orderAddress}>{item.address}</div>
                <div className={styles.orderTotal}>
                  <span>{item.total}</span>￥
                </div>
                <div className={styles.orderUnit}>
                  <span>{item.unit}</span>￥/件
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExcellentOrder

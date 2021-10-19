import React, { useState } from 'react'
import { Icon } from '@/components'
import styles from './index.module.less'

const cardList = [
  { label: '订单数量', value: '100件' },
  { label: '商品品类', value: '连衣裙' },
  { label: '加工类型', value: '清加工单' },
  { label: '发布时间', value: '2021/08/25' }
]

const demandList = [
  { label: '有效日期', value: '2021-09-30' },
  { label: '交货期', value: '自下单后 30 天内交货至指定地址' },
  { label: '地区要求', value: '不限' },
  { label: '有效车位', value: '不限' }
]

const OrderCard = () => {
  const [demand, setDemand] = useState<string>('up')
  const [above, setAbove] = useState<number>(177)

  const showDemand = () => {
    if (demand === 'up') {
      setDemand('down')
      setAbove(37)
    }
    if (demand === 'down') {
      setDemand('up')
      setAbove(177)
    }
  }
  return (
    <div className={styles.orderCard}>
      <header className={styles.cardHeader}>
        <span>广州某某有限公司</span>
        <span>
          <Icon type="jack-weizhi" className={styles.headerIcon} />
          广州市
        </span>
      </header>
      <div className={styles.cardContent}>
        <div className={styles.left}>
          <img
            className={styles.leftImg}
            src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1634628112440-4fgh.png"
          />
        </div>
        <ul className={styles.right}>
          <li className={styles.rightTitle}>女士梭织连衣裙</li>
          {cardList.map(item => (
            <li>
              {item.label}：{item.value}
            </li>
          ))}
        </ul>
        <div className={styles.obscuration} style={{ top: above }}>
          {demandList.map(item => (
            <div key={item.value} className={styles.demandItem}>
              <div className={styles.demandLabel}>{item.label}</div>
              <div className={styles.demandValue}>{item.value}</div>
            </div>
          ))}
        </div>
      </div>
      <footer className={styles.orderFooter}>
        <span
          className={styles.requirements}
          onMouseEnter={showDemand}
          onMouseLeave={showDemand}
        >
          <span>接单要求</span>
          <Icon
            type={`jack-Icon_${demand}`}
            className={styles.requirementsIcon}
          />
        </span>
        <span className={styles.deadline}>5个月后截止</span>
      </footer>
    </div>
  )
}

export default OrderCard

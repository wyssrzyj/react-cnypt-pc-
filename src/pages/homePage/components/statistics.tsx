import React from 'react'
import styles from '../index.module.less'
import { Icon } from '@/components'

// 地图右侧工厂统计信息
const Statistics = props => {
  const { province } = props
  const configs = [
    {
      icon: 'jack-gongchang',
      field: 'a',
      text: '已入驻工厂数量'
    },
    {
      icon: 'jack-shangjia',
      field: 'b',
      text: '已入驻商家数量'
    },
    {
      icon: 'jack-shebei',
      field: 'c',
      text: '已物联设备数量'
    },
    {
      icon: 'jack-dingdan1',
      field: 'd',
      text: '已服务订单数量'
    }
  ]

  return (
    <div className={styles.statisticsModal}>
      <div>{province}</div>
      {configs.map(item => {
        return (
          <div className={styles.statisticsItem} key={item.field}>
            <Icon type={item.icon} className={styles.icon}></Icon>
            <div className={styles.msg}>
              <div>
                <span className={styles.count}>{9999} </span>
                <span>&nbsp;家</span>
              </div>
              <div>{item.text}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Statistics

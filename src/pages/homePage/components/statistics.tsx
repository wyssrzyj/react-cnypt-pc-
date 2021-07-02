import React, { useEffect, useState } from 'react'
import styles from './statistics.module.less'
import { Icon } from '@/components'
import { useStores } from '@/utils/mobx'

// 地图右侧工厂统计信息
const Statistics = () => {
  // const { province } = props
  const { homeStore } = useStores()
  const { getStatisticalData } = homeStore

  const [data, setData] = useState({})

  useEffect(() => {
    ;(async () => {
      const res = (await getStatisticalData()) || {}
      setData(res)
    })()
  }, [])

  const configs = [
    {
      icon: 'jack-gongchang',
      field: 'factory',
      text: '已入驻工厂数量'
    },
    {
      icon: 'jack-shangjia',
      field: 'business',
      text: '已入驻商家数量'
    },
    {
      icon: 'jack-shebei',
      field: 'equipment',
      text: '已物联设备数量'
    },
    {
      icon: 'jack-dingdan1',
      field: 'order',
      text: '已服务订单数量'
    }
  ]

  return (
    <div className={styles.statisticsModal}>
      {/* <div>{province}</div> */}
      {configs.map(item => {
        return (
          <div className={styles.statisticsItem} key={item.field}>
            <Icon type={item.icon} className={styles.icon}></Icon>
            <div className={styles.msg}>
              <div>
                <span className={styles.count}>{data[item.field] || 0}</span>
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

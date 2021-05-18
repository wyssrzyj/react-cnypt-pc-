import Icon from '@/components/Icon'
import React from 'react'
import MapTemp from './areaComponent'
import styles from './areaSearch.module.less'

const AreaSearch = () => {
  return (
    <div>
      <div className={styles.searchTitle}>按地区查订单</div>
      <div>
        <div className={styles.leftContent}>
          <div className={styles.leftTitle}>
            <Icon type={'jack-diqu'} className={styles.icon} />
            <span className={styles.areaTitle}>长三角地区</span>
            <span className={styles.areaOrders}>(3,431个订单)</span>
          </div>
        </div>
        <div className={styles.rightContent}>
          <MapTemp></MapTemp>
        </div>
      </div>
    </div>
  )
}

export default AreaSearch

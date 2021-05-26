import React from 'react'
import styles from './index.module.less'
import OrderTypes from './components/orderTypes'
import AreaSearch from './components/areaSearch'

const OrderSearch = () => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderInner}>
        <OrderTypes></OrderTypes>
        <AreaSearch></AreaSearch>
      </div>
    </div>
  )
}

export default OrderSearch

import React from 'react'
import styles from './index.module.less'
import OrderTypes from './components/orderTypes'
import AreaSearch from './components/areaSearch'
import OrderChunk from './components/areaChunk'
import RecommondOrders from './components/recommendOrders'

const OrderSearch = () => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderInner}>
        <OrderTypes></OrderTypes>
        <AreaSearch></AreaSearch>
        <OrderChunk />
        <RecommondOrders />
      </div>
    </div>
  )
}

export default OrderSearch

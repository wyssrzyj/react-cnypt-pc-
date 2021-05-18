import React from 'react'
import Search from '@/components/search'
import styles from './index.module.less'
import OrderTypes from './components/orderTypes'
import AreaSearch from './components/areaSearch'

const OrderSearch = () => {
  return (
    <div className={styles.orderContainer}>
      <Search></Search>
      <OrderTypes></OrderTypes>
      <AreaSearch></AreaSearch>
    </div>
  )
}

export default OrderSearch

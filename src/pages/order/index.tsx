import React from 'react'
import Search from '@/components/search'
import {FliterList} from './components'
import styles from './index.module.less'


const Order = () => {
  return (
    <div className={styles.order}>
       <div className={styles.orderContainer}>
        <Search></Search>
        <FliterList/>
       </div>
    </div>
  )
}

export default Order

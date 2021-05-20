import React from 'react'
import Search from '@/components/search'
import styles from './index.module.less'
import AreaSearch from './components/areaSearch'
import Banners from './components/banners'
import Cluster from './components/cluster'

const FactoryPage = () => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderInner}>
        <Search></Search>
        <Banners></Banners>
        <AreaSearch></AreaSearch>
        <Cluster></Cluster>
      </div>
    </div>
  )
}

export default FactoryPage

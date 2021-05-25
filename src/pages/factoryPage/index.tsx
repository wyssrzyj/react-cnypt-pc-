import React from 'react'
import styles from './index.module.less'
import AreaSearch from './components/areaSearch'
import Banners from './components/banners'
import Cluster from './components/cluster'
import FactoryChunk from './components/typeFactory'
import RecommendFactory from './components/recommendFactory'
import Qualifications from './components/qualifications'

const FactoryPage = () => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderInner}>
        <Banners></Banners>
        <AreaSearch></AreaSearch>
        <Cluster></Cluster>
        <FactoryChunk></FactoryChunk>
        <RecommendFactory></RecommendFactory>
        <Qualifications></Qualifications>
      </div>
    </div>
  )
}

export default FactoryPage

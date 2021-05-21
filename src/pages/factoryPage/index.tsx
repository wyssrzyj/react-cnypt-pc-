import React from 'react'
import Search from '@/components/search'
import styles from './index.module.less'
import AreaSearch from './components/areaSearch'
import Banners from './components/banners'
import Cluster from './components/cluster'
<<<<<<< HEAD
=======
import FactoryChunk from './components/typeFactory'
import RecommendFactory from './components/recommendFactory'
import Qualifications from './components/qualifications'
>>>>>>> master

const FactoryPage = () => {
  return (
    <div className={styles.orderContainer}>
      <div className={styles.orderInner}>
        <Search></Search>
        <Banners></Banners>
        <AreaSearch></AreaSearch>
        <Cluster></Cluster>
<<<<<<< HEAD
=======
        <FactoryChunk></FactoryChunk>
        <RecommendFactory></RecommendFactory>
        <Qualifications></Qualifications>
>>>>>>> master
      </div>
    </div>
  )
}

export default FactoryPage

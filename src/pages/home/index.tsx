import React from 'react'
import styles from './index.module.less'
import { observer } from '@/utils/mobx'
import TabBar from '@/components/tabBar'
import Menu from './menu'
import Banners from './banner'

const Home = () => {
  return (
    <div className={styles.home}>
      <TabBar></TabBar>
      <div className={styles.homeContainer}>
        <Menu></Menu>
        <Banners></Banners>
      </div>
    </div>
  )
}

export default observer(Home)

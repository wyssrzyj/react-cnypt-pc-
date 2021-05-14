import React, { useEffect } from 'react'
import styles from './index.module.less'
import { observer, useStores } from '@/utils/mobx'
import TabBar from '@/components/tabBar'
import Menu from './menu'
import Banners from './banner'

const Home = () => {
  const { homeStore } = useStores()
  const {} = homeStore

  useEffect(() => {
    ;(async () => {})()
  }, [])

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

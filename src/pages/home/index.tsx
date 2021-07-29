import React from 'react'
import styles from './index.module.less'
import { observer } from '@/utils/mobx'
import Menu from './components/menu'
import Banners from './components/banner'
import UserCard from './components/userCard'
import Order from './components/order'
import Factory from './components/factory'
import OnlineHot from './components/onlineHot'
import ExcellentFactory from './components/excellentFactory'
import ExcellentOrder from './components/excellentOrder'

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <div className={styles.bannerContainer}>
          <Menu />
          <Banners />
          <UserCard />
        </div>
        <div className={styles.orderAndFactory}>
          <img src={''} className={styles.showImg} alt="" />
          <div className={styles.innerBox}>
            <Order />
            <Factory />
          </div>
        </div>
        <OnlineHot></OnlineHot>
        <ExcellentFactory></ExcellentFactory>
        <ExcellentOrder></ExcellentOrder>
      </div>
    </div>
  )
}

export default observer(Home)

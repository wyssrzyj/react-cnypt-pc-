import React from 'react'
import styles from './index.module.less'
import { observer } from '@/utils/mobx'
import TabBar from '@/components/tabBar'
import Menu from './menu'
import Banners from './banner'
import { ButtonConcat } from "am_components"

const Home = () => {
  const leftBtnProps = {
    label: "取消",
    onClick: () => console.log("left click")
}

const rightBtnProps = {
    label: "确定",
    onClick: () => console.log("right click"),
}
  return (
    <div className={styles.home}>
      <TabBar></TabBar>
      <div className={styles.homeContainer}>
        <Menu></Menu>
        <Banners></Banners>
      </div>
      <ButtonConcat leftBtnProps={leftBtnProps} rightBtnProps={rightBtnProps} />
    </div>
  )
}

export default observer(Home)

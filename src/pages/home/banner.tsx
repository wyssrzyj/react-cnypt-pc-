import React from 'react'
import { Carousel } from 'antd'
import styles from './index.module.less'
import BANNER0 from './img/banner0.jpg'
import BANNER1 from './img/banner1.jpg'
import BANNER2 from './img/banner2.jpg'

const Banners = () => {
  return (
    <div className={styles.bannerContainer}>
      <Carousel
        autoplay
        className={styles.carousel}
        // effect="fade"
        autoplaySpeed={2000}
      >
        <img src={BANNER0} alt="" />
        <img src={BANNER1} alt="" />
        <img src={BANNER2} alt="" />
      </Carousel>
    </div>
  )
}

export default Banners

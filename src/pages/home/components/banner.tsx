import React from 'react'
import { Carousel } from 'antd'
import styles from '../index.module.less'
import BANNER0 from '../img/banner0.jpg'
import BANNER1 from '../img/banner1.jpg'
import BANNER2 from '../img/banner2.jpg'

const Banners = () => {
  return (
    <div className={styles.bannerBox}>
      <Carousel
        autoplay
        className={styles.carousel}
        // effect="fade"
        autoplaySpeed={2000}
      >
        <img src={BANNER0} alt="" className={styles.bannerItem} />
        <img src={BANNER1} alt="" className={styles.bannerItem} />
        <img src={BANNER2} alt="" className={styles.bannerItem} />
      </Carousel>
    </div>
  )
}

export default Banners

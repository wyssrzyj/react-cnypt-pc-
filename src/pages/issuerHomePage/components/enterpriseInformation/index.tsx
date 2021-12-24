import React, { useState, useEffect } from 'react'
import styles from './index.module.less'
import SwiperFactorys from './components/swiperFactorys'
import Subject from './components/subject/subject'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const Enterprise = ({ informationData }) => {
  const [data, setData] = useState([])
  useEffect(() => {
    if (informationData.productImagesList.length > 0) {
      let arr = informationData.productImagesList
      arr.map(item => {
        item.pictureUrl = item.thumbUrl
      })
      setData(arr)
    }
  }, [informationData])

  return (
    <div>
      <div className={styles.data}>
        <div className={styles.dataTop}>
          <div className={styles.title}>公司信息&nbsp;&nbsp;</div>
          <div className={styles.division}></div>
          <div className={styles.name}>
            <span className={styles.test}>{informationData.name}</span>
            {/* <div className={styles.icon}>
              <Icon type="jack-shiming_2" className={styles.previous} />
              实名
            </div> */}
          </div>
          {/* 轮播图 */}
          {informationData.productImagesList.length > 0 ? (
            <SwiperFactorys SwiperCore={SwiperCore} data={data} />
          ) : null}
          {/* 简介 */}
          <div className={styles.briefIntroduction}>
            {informationData.enterpriseDesc}
          </div>
          {/* 内容和地图 */}
          <div>
            <Subject informationData={informationData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Enterprise

import React, { useEffect } from 'react'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Thumbs,
} from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import './orderOverview.less'
import u912 from '@/static/images/u912.png'
import u1495 from '@/static/images/u1495.png'
import u1496 from '@/static/images/u1496.png'
import styles from './index.module.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])

const OrderOverview = () => {
  useEffect(() => {
    const galleryThumbs = new Swiper('#gallery-thumbs', {
      spaceBetween: 10,
      slidesPerView: 4,
      watchSlidesVisibility: true, //防止不可点击
    })
    new Swiper('#gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      thumbs: {
        swiper: galleryThumbs,
      },
    })
  }, [])

  return (
    <div className={styles.orderOverview}>
      <div className={styles.overviewLeft}>
        <div className="swiper-container" id="gallery-top">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src={u912} />
            </div>
            <div className="swiper-slide">
              <img src={u1495} />
            </div>
            <div className="swiper-slide">
              <img src={u1496} />
            </div>
          </div>
          <div className="swiper-button-next swiper-button-white"></div>
          <div className="swiper-button-prev swiper-button-white"></div>
        </div>
        <div className="swiper-container" id="gallery-thumbs">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <img src={u912} />
            </div>
            <div className="swiper-slide">
              <img src={u1495} />
            </div>
            <div className="swiper-slide">
              <img src={u1496} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.overviewRight}>
        <h2>2021新品夏日限定白边牛仔裤显瘦拼接高腰牛仔裤直筒#2951</h2>
        <ul className={styles.rightList}>
          <li className={styles.rightListRow}>
            <span>分类：</span>
            <span>女装 裤子</span>
          </li>
          <li className={styles.rightListRow}>
            <span>主要市场：</span>
            <span>中国</span>
          </li>
          <li className={styles.rightListRow}>
            <span>订单数量：</span>
            <span>
              <b className={styles.rightListNum}>1000</b>条
            </span>
          </li>
          <li className={styles.rightListRow}>
            <span>订单总价：</span>
            <span>
              <b className={styles.rightListNum}>1000</b>￥
            </span>
          </li>
          <li className={styles.rightListRow}>
            <span>单件：</span>
            <span>
              <b className={styles.rightListNum}>10.00</b>￥
            </span>
          </li>
          <li className={styles.rightListRow}>
            <span>加工类型：</span>
            <span>清加工单，来料/来样加工</span>
          </li>
          <li className={styles.rightListRow}>
            <span>发布时间：</span>
            <span>2021-05-13</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default OrderOverview

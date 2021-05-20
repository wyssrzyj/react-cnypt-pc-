import React, { useEffect } from 'react'
import { Tag } from 'antd'
import { EnvironmentFilled } from '@ant-design/icons'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from 'swiper'

import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const OverflowCard = () => {
  useEffect(() => {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      loop: true,
      // autoplay: {
      //   delay: 2000,
      //   disableOnInteraction: true,
      // },
    })
  }, [])
  return (
    <div className={styles.overflowCard}>
      <div className={styles.factoryInfo}>
        <img
          className={styles.factoryImg}
          src={require('@/static/images/u1190.png')}
        />
        <div>
          <div>
            <span className={styles.factoryName}>
              石狮市一叶知秋服饰有限公司
            </span>
            <Tag className={styles.factoryTag} color="#f50">
              实名
            </Tag>
            <Tag className={styles.factoryTag} color="#f59a23">
              验厂
            </Tag>
            <EnvironmentFilled className={styles.factoryIcon} />
            <span>福建省 泉州市 石狮市</span>
            <span>
              <b className={styles.factoryScore}>4.7</b>分
            </span>
          </div>
          <ul className={styles.factoryInfoList}>
            <li>
              <span>企业类型：</span>
              <span>生产企业或加工个体户</span>
            </li>
            <li>
              <span>生产人数：</span>
              <span>10000人以上</span>
            </li>
            <li>
              <span>主要生产：</span>
              <span>服饰</span>
            </li>
            <li>
              <span>接单类型：</span>
              <span>主要承接清加工订单</span>
            </li>
            <li>
              <span>加工方式：</span>
              <span>主要做OEM来图来样加工</span>
            </li>
            <li>
              <span>工厂地址：</span>
              <span>石狮市</span>
            </li>
            <li>
              <span>联系人：</span>
              <span>黄泽华</span>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.swiperBox}>
        <div className="swiper-container mySwiper">
          <div className="swiper-wrapper">
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1495.png')}
              />
            </div>
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1496.png')}
              />
            </div>
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1497.png')}
              />
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  )
}

export default OverflowCard

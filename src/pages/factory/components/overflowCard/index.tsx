import React, { useEffect } from 'react'
import { useHistory } from 'react-router'
import { toJS } from 'mobx'
// import { Tag } from 'antd'
import { EnvironmentFilled } from '@ant-design/icons'
import { isArray, findIndex } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper'

import Swiper from 'swiper'
import { transformProduceNumber } from '@/utils/tool'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const OverflowCard = props => {
  const {
    factoryId,
    factoryName,
    factoryDistrict,
    staffNumber,
    factoryCategoryList = [],
    prodTypeList = []
  } = props

  const history = useHistory()
  const goToDetail = () => {
    history.push(`/factory-detail/${factoryId}`)
  }
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const allProdTypeList = toJS(dictionary).prodType

  useEffect(() => {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true
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
            <a className={styles.factoryName} onClick={goToDetail}>
              {factoryName}
            </a>
            {/* <Tag className={styles.factoryTag} color="#f50">
              实名
            </Tag>
            <Tag className={styles.factoryTag} color="#f59a23">
              验厂
            </Tag> */}
            <EnvironmentFilled className={styles.factoryIcon} />
            <span>{factoryDistrict}</span>
            {/* <span>
              <b className={styles.factoryScore}>4.7</b>分
            </span> */}
          </div>
          <ul className={styles.factoryInfoList}>
            <li>
              <span>生产人数：</span>
              <span>{transformProduceNumber(staffNumber)}</span>
            </li>
            <li>
              <span>主要生产：</span>
              <span>
                {isArray(factoryCategoryList) && factoryCategoryList.join('、')}
              </span>
            </li>
            <li>
              <span>加工类型：</span>
              <span>
                {isArray(prodTypeList) &&
                  allProdTypeList
                    .filter(function (val) {
                      return (
                        findIndex(prodTypeList, function (o) {
                          return o.processType == val.value
                        }) > -1
                      )
                    })
                    .map(item => item.label)
                    .join('、')}
              </span>
              {}
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

export default observer(OverflowCard)

import React, { useEffect, useMemo } from 'react'
// import { useHistory } from 'react-router'
import { toJS } from 'mobx'
import { Tag } from 'antd'
import { isArray, findIndex } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { Icon } from '@/components'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper'

import Swiper from 'swiper'
// import { transformProduceNumber } from '@/utils/tool'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const OverflowCard = props => {
  const {
    factoryId,
    factoryName,
    factoryDistrict,
    effectiveLocation = '0',
    factoryCategoryList = [],
    prodTypeList = [],
    pictureUrl,
    factoryTagList = []
  } = props

  // const history = useHistory()

  const { commonStore } = useStores()
  const { dictionary, updateName } = commonStore
  const allProdTypeList = toJS(dictionary).prodType || []

  const goToDetail = () => {
    updateName('')
    // history.push(`/factory-detail/${factoryId}`)
    window.open(`/factory-detail/${factoryId}`)
  }

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

  const imgUrl = useMemo(() => {
    if (pictureUrl) {
      return (
        pictureUrl +
        '?x-oss-process=image/resize,limit_0,m_fill,w80,h_80/quality,q_100'
      )
    }
    return ''
  }, [pictureUrl])

  return (
    <div className={styles.overflowCard}>
      <div className={styles.factoryInfo} onClick={goToDetail}>
        <div className={styles.imgBox}>
          <img className={styles.factoryImg} src={imgUrl} />
        </div>
        <div className={styles.detail}>
          <div className={styles.detailTop}>
            <div>
              <a className={styles.factoryName}>{factoryName}</a>
              {isArray(factoryTagList) &&
                factoryTagList.find(item => item === 'verified_tag') && (
                  <Tag className={styles.factoryTag} color="#45CC7E">
                    <Icon type="jack-shiming1" className={styles.tagIcon} />
                    实名
                  </Tag>
                )}
              <Tag className={styles.factoryTag} color="#3B88FF">
                <Icon type="jack-ycsq" className={styles.tagIcon} />
                验厂
              </Tag>
            </div>
            <div className={styles.addressBox}>
              <Icon type="jack-dizhi" className={styles.address} />
              <span>{factoryDistrict ? factoryDistrict : '待完善'}</span>
            </div>
            {/* <span>
              <b className={styles.factoryScore}>4.7</b>分
            </span> */}
          </div>
          <ul className={styles.factoryInfoList}>
            <li>
              <span className={styles.ulName}>
                <Icon type="jack-scrs" className={styles.ulIcon} />
                有效车位：
              </span>
              <span>{effectiveLocation ? effectiveLocation : '0'}台</span>
            </li>
            <li>
              <span className={styles.ulName}>
                <Icon type="jack-zysc" className={styles.ulIcon} />
                主要生产：
              </span>
              <span>
                {isArray(factoryCategoryList)
                  ? factoryCategoryList.join('、')
                  : '待完善'}
              </span>
            </li>
            <li>
              <span className={styles.ulName}>
                <Icon type="jack-jglx" className={styles.ulIcon} />
                加工类型：
              </span>
              <span>
                {isArray(prodTypeList)
                  ? allProdTypeList
                      .filter(function (val) {
                        return (
                          findIndex(prodTypeList, function (o) {
                            return o.processType == val.value
                          }) > -1
                        )
                      })
                      .map(item => item.label)
                      .join('、')
                  : '待完善'}
              </span>
              {}
            </li>
          </ul>
        </div>
      </div>
      {/* <div className={styles.swiperBox}>
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
      </div> */}
    </div>
  )
}

export default observer(OverflowCard)

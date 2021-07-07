import React, { useState, useEffect } from 'react'
import { isEmpty, isNil } from 'lodash'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import { useStores, observer } from '@/utils/mobx'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs } from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])

const Overview = props => {
  const { current = {}, factoryId } = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const currentUser = getCurrentUser() || {}
  const factoryImg = [...current.factoryOutsizeImages, ...current.factoryWorkshopImages]
  const [contactInfo, setContactInfo] = useState<any>({})

  const getContactInfo = () => {
    axios
      .get('/api/user/get-user-info-factory-id', {
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          setContactInfo({ ...data })
        }
      })
  }

  const notLoggedIn = (str, frontLen, endLen) => {
    if (!isNil(str)) {
      if (isEmpty(currentUser)) {
        var len = str.length - frontLen - endLen
        var xing = ''
        for (var i = 0; i < len; i++) {
          xing += '*'
        }
        return str.substring(0, frontLen) + xing + str.substring(str.length - endLen)
      } else {
        return str
      }
    }
  }

  useEffect(() => {
    if (!isEmpty(current)) {
      const galleryThumbs = new Swiper('#gallery-thumbs', {
        spaceBetween: 10,
        slidesPerView: 5,
        watchSlidesVisibility: true //防止不可点击
      })
      new Swiper('#gallery-top', {
        spaceBetween: 10,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        thumbs: {
          swiper: galleryThumbs
        },
        loop: true
      })
    }
  }, [current])

  useEffect(() => {
    if (dictionary) {
      getContactInfo()
    }
  }, [dictionary])

  return (
    <div className={styles.factoryInfo}>
      <div className={styles.factoryInfoContent}>
        {!isEmpty(current) && (
          <div className={styles.slideshow}>
            <div className="swiper-container" id="gallery-top">
              <div className="swiper-wrapper">
                {factoryImg.map((item, index) => (
                  <div key={index} className="swiper-slide">
                    <img src={item} />
                  </div>
                ))}
              </div>
              <div className="swiper-button-next swiper-button-white"></div>
              <div className="swiper-button-prev swiper-button-white"></div>
            </div>
            <div className="swiper-container" id="gallery-thumbs">
              <div className="swiper-wrapper">
                {factoryImg.map((item, index) => (
                  <div key={index} className="swiper-slide factory-small-img">
                    <img src={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className={styles.infoRight}>
          <ul className={styles.factoryInfoList}>
            <li>
              <span className={styles.rightLabel}>
                <Icon type="jack-lianxiren" className={styles.icon} />
                联系人
              </span>
              <span className={styles.rightValue}>{contactInfo.realName}</span>
            </li>
            <li>
              <span className={styles.rightLabel}>
                <Icon type="jack-shoujihao" className={styles.icon} />
                手机号
              </span>
              <span className={styles.rightValue}>{notLoggedIn(contactInfo.mobilePhone, 3, 4)}</span>
            </li>
            <li>
              <span className={styles.rightLabel}>
                <Icon type="jack-zuoji" className={styles.icon} />
                座机号码
              </span>
              <span className={styles.rightValue}>{notLoggedIn(contactInfo.contactPhone, 5, 1)}</span>
            </li>
            <li>
              <span className={styles.rightLabel}>
                <Icon type="jack-youxiang" className={styles.icon} />
                邮箱
              </span>
              <span className={styles.rightValue}>{notLoggedIn(contactInfo.email, 1, 7)}</span>
            </li>
            <li>
              <span className={styles.rightLabel}>
                <Icon type="jack-dizhi" className={styles.icon} />
                地址
              </span>
              <span className={styles.rightValue}>{current.address}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default observer(Overview)

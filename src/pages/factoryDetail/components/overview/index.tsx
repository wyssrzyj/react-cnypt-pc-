import React, { useState, useEffect, useRef } from 'react'
import { isEmpty, isNil } from 'lodash'
import { Scene, Marker, MarkerLayer } from '@antv/l7'
import { GaodeMap } from '@antv/l7-maps'
import { Icon } from '@/components'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs } from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])

const Overview = props => {
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const { current = {}, factoryId } = props
  const currentUser = getCurrentUser() || {}
  const { factoryOutsizeImages, factoryWorkshopImages } = current
  const factoryImg =
    factoryOutsizeImages && factoryWorkshopImages ? [...current.factoryOutsizeImages, ...current.factoryWorkshopImages] : []
  const [contactInfo, setContactInfo] = useState<any>({})
  const [curKey, setCurKey] = useState(0)

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
    } else {
      return '--'
    }
  }
  const keyChange = event => {
    const { activeIndex } = event
    setCurKey(activeIndex)
  }
  const toLeft = () => {
    rightRef.current.click()
  }

  const toRight = () => {
    leftRef.current.click()
  }

  useEffect(() => {
    if (!isEmpty(factoryImg)) {
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
        loop: false,
        effect: 'fade',
        on: {
          slideChange: keyChange
        }
      })
      const { latitude = '30.404645', longitude = '20.311123' } = current
      const scene = new Scene({
        id: 'address',
        map: new GaodeMap({
          style: 'normal',
          center: [longitude, latitude],
          pitch: 0,
          zoom: 13,
          rotation: 0
        })
      })

      scene.on('loaded', () => {
        const markerLayer = new MarkerLayer()
        const el = document.createElement('label')
        el.className = 'labelclass'
        el.style.background = 'url(https://gw.alipayobjects.com/mdn/antv_site/afts/img/A*BJ6cTpDcuLcAAAAAAAAAAABkARQnAQ)'
        const marker: any = new Marker({
          element: el
        }).setLnglat({ lng: longitude, lat: latitude })
        markerLayer.addMarker(marker)
        scene.addMarkerLayer(markerLayer)
      })
    }
  }, [current])

  useEffect(() => {
    getContactInfo()
  }, [])

  return (
    <div className={styles.factoryInfo}>
      <div className={styles.factoryInfoContent}>
        {!isEmpty(factoryImg) && (
          <div className={styles.slideshow}>
            <div className="swiper-container" id="gallery-top">
              <div className="swiper-wrapper">
                {factoryImg.map((item, index) => (
                  <div key={index} className="swiper-slide">
                    <img src={item} />
                  </div>
                ))}
              </div>
              <div className="swiper-button-next swiper-button-white" ref={leftRef}></div>
              <div className="swiper-button-prev swiper-button-white" ref={rightRef}></div>
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
            <div className="overview-button overview-button-next" onClick={toLeft}>
              {curKey === 0 ? (
                <Icon type="jack-shang_icon" className={styles.leftIcon} />
              ) : (
                <Icon type="jack-xia_icon" className={styles.rightIcon} />
              )}
            </div>
            <div className="overview-button overview-button-prev" onClick={toRight}>
              {curKey < factoryImg.length - 1 ? (
                <Icon type="jack-xia_icon" className={styles.leftIcon} />
              ) : (
                <Icon type="jack-shang_icon" className={styles.rightIcon} />
              )}
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
              <span className={styles.rightValue}>{contactInfo.realName ? contactInfo.realName : '--'}</span>
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
            <li>
              <div id="address" className={styles.mapTemp}></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Overview

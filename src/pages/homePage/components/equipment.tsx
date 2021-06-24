import React, { useRef, useState, useLayoutEffect } from 'react'
import styles from '../index.module.less'
import classNames from 'classnames'
import IMG7 from '../img/focus7.png'
import IMG8 from '../img/focus8.png'
import IMG9 from '../img/focus9.png'
import IMG10 from '../img/focus10.png'
import { Icon } from '@/components'
import OIMG from '../img/operateImg.png'
// 最新物联设备
const Equipment = props => {
  const { SwiperCore } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(0)

  useLayoutEffect(() => {
    new SwiperCore('.equipmentSwiper', {
      // slidesPerView: 1,
      // centeredSlides: true,
      // centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: false,
      effect: 'fade',
      on: {
        slideChange: keyChange
      }
    })
  }, [])

  const keyChange = event => {
    const { activeIndex } = event
    console.log('🚀 ~~~~~~', activeIndex)
    setCurKey(activeIndex)
  }

  const toLeft = () => {
    rightRef.current.click()
  }

  const toRight = () => {
    leftRef.current.click()
  }

  const datas = [IMG10, IMG9, IMG8, IMG7]

  return (
    <div className={styles.equipment}>
      <div className={styles.equipmentInner}>
        <div className={styles.header}>
          <div className={styles.oTitle}>最新物联设备</div>
          <div className={styles.oText}>THE LATEST IOT EQUIPMENT</div>
          <img src={OIMG} alt="" className={styles.img} />
        </div>
        <div className={styles.equipmentSwiperOut}>
          <div
            onChange={keyChange}
            className={classNames(
              'swiper-container equipmentSwiper',
              styles.equipmentSwiper
            )}
          >
            <div className="swiper-wrapper">
              {datas.map((item, idx) => (
                <div className={'swiper-slide'} key={idx + '~'}>
                  <img src={item} alt="" className={styles.equipmentImg} />
                </div>
              ))}
            </div>
            <div className="swiper-button-next" ref={leftRef}></div>
            <div className="swiper-button-prev" ref={rightRef}></div>
          </div>
        </div>
        <div className={styles.operateBtns}>
          <Icon
            type={'jack-zuo_3'}
            onClick={toLeft}
            className={classNames(
              styles.operateLeftIcon,
              curKey === 0 && styles.operateDisableIcon
            )}
          />
          <Icon
            type={'jack-you_3'}
            onClick={toRight}
            className={classNames(
              styles.operateRightIcon,
              curKey === datas.length - 1 && styles.operateDisableIcon
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default Equipment

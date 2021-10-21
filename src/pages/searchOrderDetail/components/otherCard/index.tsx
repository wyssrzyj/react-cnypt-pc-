import React, { useState, useEffect, useRef } from 'react'
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { Title } from '@/components'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
import { OrderCard } from '../../../searchOrder/components'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import { observer } from '@/utils/mobx'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const OtherCard = () => {
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(0)

  const list = new Array(10).fill(1)

  useEffect(() => {
    new SwiperCore('.orderSwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: false,
      on: {
        slideChange: keyChange
      }
    })
  }, [])

  const toLeft = () => {
    rightRef.current.click()
  }

  const toRight = () => {
    leftRef.current.click()
  }

  const keyChange = event => {
    const { activeIndex } = event
    setCurKey(activeIndex)
  }

  return (
    <div className={styles.otherCard}>
      <Title title={'该商家其它订单'} />
      <div className={styles.swiperContainer}>
        <div
          onChange={keyChange}
          className={classNames(
            'swiper-container orderSwiper',
            styles.orderSwiper
          )}
        >
          {list.length > 0 && (
            <div className="swiper-wrapper">
              {list.map((item, idx) => {
                if (!item) return null
                return (
                  <div className={'swiper-slide'} key={idx}>
                    <OrderCard contentConfig={item} />
                  </div>
                )
              })}
            </div>
          )}
          {list.length > 0 ? (
            <>
              <div className="swiper-button-next" ref={leftRef}></div>
              <div className="swiper-button-prev" ref={rightRef}></div>
            </>
          ) : null}
          <div className="swiper-pagination"></div>
        </div>
        <div className={styles.operation}>
          <LeftCircleOutlined
            onClick={toLeft}
            className={classNames(
              styles.operationIcon,
              curKey === 1 && styles.disableIcon
            )}
          />
          <RightCircleOutlined
            onClick={toRight}
            className={classNames(
              styles.operationIcon,
              curKey === list.length - 2 && styles.disableIcon
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default observer(OtherCard)

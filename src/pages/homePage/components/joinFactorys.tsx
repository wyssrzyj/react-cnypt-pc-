import React, { useRef, useState, useLayoutEffect } from 'react'
import styles from '../index.module.less'
import classNames from 'classnames'
import IMG1 from '../img/focus1.png'
import IMG2 from '../img/focus2.png'
import IMG3 from '../img/focus3.png'
import IMG4 from '../img/focus4.png'
import { Icon } from '@/components'

// 加盟工厂卡片
const JoinCard = props => {
  const { data } = props

  return (
    <div className={styles.joinCard}>
      <img src={data.url} alt="" className={styles.joinImg} />
      <div className={styles.joinInfo}>
        <div className={styles.joinInfoTitle}>{data.factoryName}</div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-nianfen_bai'} className={styles.joinIcon} />
            <span>成立年份</span>
          </span>
          <span>{data.date || 0}年</span>
        </div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-diqu_bai'} className={styles.joinIcon} />
            <span>地区</span>
          </span>
          <span>{data.area}</span>
        </div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-chewei'} className={styles.joinIcon} />
            <span>有效车位</span>
          </span>
          <span>{data.count}</span>
        </div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-pinpai_bai'} className={styles.joinIcon} />
            <span>服务品牌</span>
          </span>
          <span>{data.serve}</span>
        </div>
      </div>
    </div>
  )
}

// 加盟工厂轮播
const JoinFactorys = props => {
  const { SwiperCore } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(1)

  useLayoutEffect(() => {
    new SwiperCore('.factorySwiper', {
      slidesPerView: 3,
      spaceBetween: 0,
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
      // autoplay: {
      //   delay: 2000,
      //   disableOnInteraction: true,
      // },
    })
  }, [])

  const datas = [
    {
      id: 8,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔',
      date: '10',
      url: IMG1
    },
    {
      id: 9,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔',
      date: '10',
      url: IMG2
    },
    {
      id: 10,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔',
      date: '10',
      url: IMG3
    },
    {
      id: 11,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔',
      date: '10',
      url: IMG4
    }
  ]

  const toLeft = () => {
    rightRef.current.click()
  }

  const toRight = () => {
    leftRef.current.click()
  }

  const keyChange = event => {
    const { activeIndex } = event
    console.log('🚀 ~ file: index.tsx ~ line 185 ~ activeIndex', activeIndex)
    setCurKey(activeIndex)
  }

  return (
    <div className={styles.joinSwaiperContainer}>
      <div
        onChange={keyChange}
        className={classNames(
          'swiper-container factorySwiper',
          styles.joinSwiper
        )}
      >
        <div className="swiper-wrapper">
          {datas.map(item => (
            <div className={'swiper-slide'} key={item.id}>
              <JoinCard data={item} />
            </div>
          ))}
        </div>
        <div className="swiper-button-next" ref={leftRef}></div>
        <div className="swiper-button-prev" ref={rightRef}></div>
        <div className="swiper-pagination"></div>
      </div>
      <div className={styles.joinRight}>
        <div className={styles.joinRightTitle}>加盟工厂</div>
        <div className={styles.joinRightText}>FRANCHISE FACTORY</div>
        <Icon
          type={'jack-zuo_2'}
          onClick={toLeft}
          className={classNames(
            styles.joinLeftIcon,
            curKey === 1 && styles.joinDisableIcon
          )}
        />
        <Icon
          type={'jack-you_2'}
          onClick={toRight}
          className={classNames(
            styles.joinRightIcon,
            curKey === datas.length - 2 && styles.joinDisableIcon
          )}
        />
      </div>
    </div>
  )
}

export default JoinFactorys

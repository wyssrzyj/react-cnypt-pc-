import React, { useRef, useState, useLayoutEffect } from 'react'
import styles from '../index.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'

// 地图工厂轮播卡片
const SwiperCard = props => {
  const { data } = props

  const configs = [
    {
      icon: 'jack-diqu_bai',
      label: '地区',
      field: 'area'
    },
    {
      icon: 'jack-chewei',
      label: '车位',
      field: 'count'
    },
    {
      icon: 'jack-zhuying_bai',
      label: '主营',
      field: 'type'
    }
  ]

  return (
    <div className={styles.swaperCard}>
      <img src={data.img} alt="" className={styles.swaiperImg} />
      <div>
        <div className={styles.factoryName}>{data.factoryName}</div>
        {configs.map(item => {
          return (
            <div key={item.field} className={styles.factoryInfo}>
              <div className={styles.label}>
                <Icon
                  type={item.icon}
                  className={styles.factoryInfoIcon}
                ></Icon>
                &nbsp;
                {item.label}
              </div>
              <div>{data[item.field]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
// 顶部地图工厂轮播
const SwiperFactorys = props => {
  const { SwiperCore } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(1)

  useLayoutEffect(() => {
    new SwiperCore('.mySwiper', {
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
      // autoplay: {
      //   delay: 2000,
      //   disableOnInteraction: true,
      // },
    })
  }, [])

  const datas = [
    {
      id: `01`,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔'
    },
    {
      id: `02`,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔'
    },
    {
      id: `03`,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔'
    },
    {
      id: `04`,
      factoryName: '绍兴市昌辉服饰有限公司',
      area: '浙江-绍兴-越城区',
      count: '180台',
      type: '牛仔'
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
    <div className={styles.swaiperContainer}>
      <div
        onChange={keyChange}
        className={classNames('swiper-container mySwiper', styles.mySwiper)}
      >
        <div className="swiper-wrapper">
          {datas.map(item => (
            <div className={'swiper-slide'} key={item.id}>
              <SwiperCard data={item} />
            </div>
          ))}
        </div>
        <div className="swiper-button-next" ref={leftRef}></div>
        <div className="swiper-button-prev" ref={rightRef}></div>
        <div className="swiper-pagination"></div>
      </div>
      <div>
        <Icon
          type={'jack-zuo_2'}
          onClick={toLeft}
          className={classNames(
            styles.leftIcon,
            curKey === 1 && styles.disableIcon
          )}
        />
        <Icon
          type={'jack-you_2'}
          onClick={toRight}
          className={classNames(
            styles.rightIcon,
            curKey === datas.length - 2 && styles.disableIcon
          )}
        />
      </div>
    </div>
  )
}

export default SwiperFactorys

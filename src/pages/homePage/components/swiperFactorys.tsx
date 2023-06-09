import React, { useRef, useState, useEffect } from 'react'
import styles from './swiperFactorys.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import { observer, useStores } from '@/utils/mobx'

// 地图工厂轮播卡片
const SwiperCard = props => {
  const { data } = props
  const keys = Reflect.ownKeys(data)
  if (!keys.length) return null

  const configs = [
    {
      icon: 'jack-diqu_bai',
      label: '地区',
      field: 'factoryDistrict'
    },
    {
      icon: 'jack-chewei',
      label: '车位',
      field: 'effectiveLocation'
    },
    {
      icon: 'jack-zhuying_bai',
      label: '主营',
      field: 'factoryCategoryList'
    }
  ]

  const toFactoryDetail = () => {
    window.open(`/factory-detail/${data.factoryId}`)
  }

  return (
    <div className={styles.swaperCard} onClick={toFactoryDetail}>
      <img src={data.pictureUrl} alt="" className={styles.swaiperImg} />
      <div>
        <div className={styles.factoryName}>{data.factoryName}</div>
        {configs.map((item, idx) => {
          let target = ''
          if (idx === 0) {
            target = data[item.field]
              ? data[item.field].replace(/,/g, '-')
              : null
          }
          if (idx === 1) {
            target = data[item.field]
          }
          if (idx === 2) {
            target = data[item.field] ? data[item.field].join('、') : null
          }
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
              <div className={styles.text}>{target}</div>
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

  const { factoryStore } = useStores()
  const { getFactoryList } = factoryStore

  const [list, setList] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      const params = {
        pageSize: 10,
        sortField: 'newest',
        sortType: 'Desc'
      }
      const res = await getFactoryList(params)
      const arr = res.records || []
      setList(arr)
    })()
  }, [])

  useEffect(() => {
    new SwiperCore('.factorysSwiper', {
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
  }, [list])

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
    <div className={styles.swaiperContainer}>
      <div
        onChange={keyChange}
        className={classNames(
          'swiper-container factorysSwiper',
          styles.factorysSwiper
        )}
      >
        {list.length > 0 && (
          <div className="swiper-wrapper">
            {list.map((item, idx) => {
              if (!item) return null
              return (
                <div className={'swiper-slide'} key={idx}>
                  <SwiperCard data={item} />
                </div>
              )
            })}
          </div>
        )}

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
            curKey === list.length - 2 && styles.disableIcon
          )}
        />
      </div>
    </div>
  )
}

export default observer(SwiperFactorys)

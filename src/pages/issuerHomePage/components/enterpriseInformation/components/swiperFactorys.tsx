import React, { useRef, useState, useEffect, useMemo } from 'react'
import styles from './swiperFactorys.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import { observer, useStores } from '@/utils/mobx'

// 地图工厂轮播卡片
const SwiperCard = props => {
  const { data } = props
  const keys = Reflect.ownKeys(data)
  if (!keys.length) return null

  const imgUrl = useMemo(() => {
    if (data.pictureUrl) {
      return (
        data.pictureUrl +
        '?x-oss-process=image/resize,limit_0,m_fill,w80,h_80/quality,q_100'
      )
    }
    return ''
  }, [data.pictureUrl])

  return (
    <div className={styles.swiperCard}>
      <img src={imgUrl} alt="" className={styles.swiperImg} />
    </div>
  )
}

// 顶部地图工厂轮播
const SwiperFactorys = props => {
  const { factoryStore } = useStores()
  const { getFactoryList } = factoryStore
  const { SwiperCore, data } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(0)
  const [list, setList] = useState<any>([])

  useEffect(() => {
    ;(async () => {
      const params = {
        pageSize: 10,
        sortField: 'newest',
        sortType: 'Desc'
      }
      const res = await getFactoryList(params)
      res.records || []
    })()
    if (data) {
      setList(data)
    }
  }, [data])

  useEffect(() => {
    new SwiperCore('.factorysSwiper', {
      slidesPerView: 4,
      spaceBetween: 20,
      centeredSlides: false,
      centeredSlidesBounds: true,
      direction: 'horizontal',
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

        {list.length > 0 ? (
          <>
            <div className="swiper-button-next" ref={leftRef}></div>
            <div className="swiper-button-prev" ref={rightRef}></div>
          </>
        ) : null}
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

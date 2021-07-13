import React, { useRef, useState, useEffect } from 'react'
import styles from './joinFactorys.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import { useStores, observer } from '@/utils/mobx'

// 加盟工厂卡片
const JoinCard = props => {
  const { data } = props

  return (
    <div className={styles.joinCard}>
      <img src={data.pictureUrl} alt="" className={styles.joinImg} />
      <div className={styles.joinInfo}>
        <div className={styles.joinInfoTitle}>{data.factoryName}</div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-nianfen_bai'} className={styles.joinIcon} />
            <span>成立年限</span>
          </span>
          <span>{data.establishedIn || 0}年</span>
        </div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-diqu_bai'} className={styles.joinIcon} />
            <span>地区</span>
          </span>
          <span className={styles.joinText}>{data.factoryDistrict}</span>
        </div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-chewei'} className={styles.joinIcon} />
            <span>有效车位</span>
          </span>
          <span className={styles.joinText}>{data.effectiveLocation}</span>
        </div>
        <div className={styles.joinInfoItem}>
          <span className={styles.joinLabel}>
            <Icon type={'jack-pinpai_bai'} className={styles.joinIcon} />
            <span>服务品牌</span>
          </span>
          <span className={styles.joinText}>
            {data.receiveOrderHistoryDesc}
          </span>
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

  const { factoryStore } = useStores()
  const { getFactoryList } = factoryStore

  const [curKey, setCurKey] = useState(1)
  const [data, setData] = useState([])

  useEffect(() => {
    ;(async () => {
      const res = await getFactoryList({ searchType: 'affiliate' })
      setData(res.records)
    })()
  }, [])

  useEffect(() => {
    if (data && data.length) {
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
    }
  }, [data])

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
    <div className={styles.joinSwaiperContainer}>
      <div
        onChange={keyChange}
        className={classNames(
          'swiper-container factorySwiper',
          styles.joinSwiper
        )}
      >
        <div className="swiper-wrapper">
          {data.map(item => (
            <div className={'swiper-slide'} key={item.factoryId}>
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
            curKey === data.length - 2 && styles.joinDisableIcon
          )}
        />
      </div>
    </div>
  )
}

export default observer(JoinFactorys)

import React, { useRef, useState, useEffect, useMemo } from 'react'
import styles from './swiperFactorys.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import { observer, useStores, toJS } from '@/utils/mobx'
import { getTrees } from './method/index'
import { useHistory } from 'react-router'

// 顶部地图工厂轮播
const SwiperFactorys = props => {
  const { factoryStore } = useStores()
  const { getFactoryList, productCategoryList } = factoryStore
  const { SwiperCore } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(0)

  const [list, setList] = useState<any>([])
  const history = useHistory()
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
      console.log(data)
      history.push({
        pathname: `/factory-detail/${data.factoryId}`,
        state: {
          enterpriseId: data.enterpriseId
        }
      })
      // window.open(`/factory-detail/${data.factoryId}`)..
    }

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
      <div className={styles.swaperCard} onClick={toFactoryDetail}>
        <img src={imgUrl} alt="" className={styles.swaiperImg} />
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
              target = data[item.field]
                ? getTrees(
                    data[item.field],
                    toJS(productCategoryList),
                    'code',
                    'name'
                  ).join('、')
                : null
            }
            return (
              <div key={item.field} className={styles.factoryInfo}>
                <div className={styles.label}>
                  <Icon
                    type={item.icon}
                    className={styles.factoryInfoIcon}
                  ></Icon>
                  &nbsp;
                  <span>{item.label}</span>
                </div>
                <div className={styles.text}>{target}</div>
              </div>
            )
          })}
        </div>
      </div>
    )
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

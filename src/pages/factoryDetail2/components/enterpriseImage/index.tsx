import React, { useState, useEffect, useRef } from 'react'
import { Radio, Image } from 'antd'
import classNames from 'classnames'
import { isEmpty } from 'lodash'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  Thumbs
} from 'swiper'
import Swiper from 'swiper'
import 'swiper/swiper-bundle.min.css'
import { Icon, NoData } from '@/components'
import HeaderLine from '../headerLine'
import styles from './index.module.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, Thumbs])

const imageType = [
  {
    value: 'outside',
    label: '厂房外景'
  },
  {
    value: 'workshop',
    label: '车间照片'
  }
]
const EnterpriseImage = props => {
  const { current } = props
  const { factoryOutsizeImages = [], factoryWorkshopImages = [] } = current
  const [type, setType] = useState('outside')

  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(0)

  const [list, setList] = useState<any>(
    factoryOutsizeImages ? [...factoryOutsizeImages] : []
  )

  useEffect(() => {
    if (list) {
      new Swiper('.factorysSwiper', {
        slidesPerView: 4,
        spaceBetween: 20,
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
    }
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

  const onGroupChange = e => {
    setType(e.target.value)
    e.target.value === 'outside' &&
      setList(factoryOutsizeImages ? [...factoryOutsizeImages] : [])
    e.target.value === 'workshop' &&
      setList(factoryWorkshopImages ? [...factoryWorkshopImages] : [])
  }

  return (
    <div className={styles.enterpriseImage}>
      <HeaderLine chinese="企业照片" english="CORPORATE PHOTOS" />
      <Radio.Group
        value={type}
        onChange={onGroupChange}
        optionType="button"
        buttonStyle="solid"
      >
        {imageType.map(item => (
          <Radio.Button key={item.value} value={item.value}>
            {item.label}
          </Radio.Button>
        ))}
      </Radio.Group>

      {isEmpty(list) ? (
        <NoData
          style={{
            width: 1120,
            height: 154,
            backgroundColor: '#f6f6f6',
            marginTop: 20
          }}
        />
      ) : (
        <div className={styles.swaiperContainer}>
          <div
            onChange={keyChange}
            className={classNames(
              'swiper-container factorysSwiper',
              styles.factorysSwiper
            )}
          >
            {list.length > 0 && (
              <div className={classNames('swiper-wrapper', styles.listWrapper)}>
                {list.map((item, idx) => {
                  if (!item) return null
                  return (
                    <div className={'swiper-slide'} key={idx}>
                      <Image className={styles.swaiperImg} src={item} />
                      {/* <img className={styles.swaiperImg} src={item} alt="" /> */}
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
            <div className={styles.left} onClick={toLeft}>
              {curKey === 0 ? (
                <Icon type="jack-shang_icon" className={styles.leftIcon} />
              ) : (
                <Icon type="jack-xia_icon" className={styles.rightIcon} />
              )}
            </div>
            <div className={styles.right} onClick={toRight}>
              {curKey < list.length - 4 ? (
                <Icon type="jack-xia_icon" className={styles.leftIcon} />
              ) : (
                <Icon type="jack-shang_icon" className={styles.rightIcon} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EnterpriseImage

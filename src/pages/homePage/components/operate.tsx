import React, { useRef, useState, useLayoutEffect } from 'react'
import styles from '../index.module.less'
import classNames from 'classnames'
import { Icon } from '@/components'
import OIMG from '../img/operateImg.png'
import IMG1 from '../img/focus1.png'

// 运营卡片一
const OperateCard1 = props => {
  const { data } = props

  return (
    <div className={styles.operateCard1}>
      <img src={IMG1} alt="" className={styles.operateImg1} />
      <div className={styles.operateCardContent1}>
        <div className={styles.operateCardTitle1}>{data.name}</div>
        <div className={styles.operateText1}>
          <div className={styles.operateLabel1}>
            <Icon type={'jack-yanchang'} className={styles.operateIcon1} />
            <span>已验厂</span>
          </div>
          <span>{data.inspection}家</span>
        </div>
        <div className={styles.operateText1}>
          <div className={styles.operateLabel1}>
            <Icon type={'jack-genzong'} className={styles.operateIcon1} />
            <span>已跟踪</span>
          </div>
          <span>{data.track}家</span>
        </div>
      </div>
    </div>
  )
}

// 运营卡片二
const OperateCard2 = props => {
  const { data } = props

  return (
    <div className={styles.operateCard2}>
      <div className={styles.operateInfo2}>
        <img src={IMG1} alt="" className={styles.operateImg2} />
        <div>
          <div className={styles.operateCardTitle2}>{data.name}</div>
          <div className={styles.operateText2}>
            <div className={styles.operateLabel2}>
              <Icon type={'jack-yanchang'} className={styles.operateIcon2} />
              <span>已验厂</span>
            </div>
            <span>{data.inspection}家</span>
          </div>
          <div className={styles.operateText2}>
            <div className={styles.operateLabel2}>
              <Icon type={'jack-genzong'} className={styles.operateIcon2} />
              <span>已跟踪</span>
            </div>
            <span>{data.track}家</span>
          </div>
        </div>
      </div>
      <div className={styles.operateIntro2}>
        <div className={styles.intro}>个人介绍</div>
        <div>阿斯顿发斯蒂芬发阿斯蒂芬撒打发大师傅阿斯蒂芬</div>
      </div>
    </div>
  )
}

// 运营团队
const Operate = props => {
  const { SwiperCore } = props
  const leftRef = useRef<HTMLDivElement>()
  const rightRef = useRef<HTMLDivElement>()
  const [curKey, setCurKey] = useState(1)

  useLayoutEffect(() => {
    new SwiperCore('.operateSwiper', {
      slidesPerView: 3,
      // spaceBetween: 20,
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
      id: 118,
      img: '',
      name: '刘丽',
      inspection: 1000,
      track: 100
    },
    {
      id: 119,
      img: '',
      name: '刘丽',
      inspection: 1000,
      track: 100,
      intro:
        '从事6年市场推广工作，与国内126家服装工厂建立了十分密切的关系，并在行业中拥有广泛的业务关系。非常热爱市场推广工作，有饱满的工作热情。'
    },
    {
      id: 120,
      img: '',
      name: '刘丽',
      inspection: 1000,
      track: 100
    },
    {
      id: 121,
      img: '',
      name: '刘丽',
      inspection: 1000,
      track: 100,
      intro:
        '从事6年市场推广工作，与国内126家服装工厂建立了十分密切的关系，并在行业中拥有广泛的业务关系。非常热爱市场推广工作，有饱满的工作热情。'
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
    <div className={styles.operateSwaiperContainer}>
      <div className={styles.operateTitle}>
        <div className={styles.oTitle}>运营团队</div>
        <div className={styles.oText}>OPERATION TEAM</div>
        <img src={OIMG} alt="" className={styles.operateImg} />
      </div>
      <div
        onChange={keyChange}
        className={classNames(
          'swiper-container operateSwiper',
          styles.operateSwiper
        )}
      >
        <div className="swiper-wrapper">
          {datas.map((item, idx) => (
            <div className={'swiper-slide'} key={item.id}>
              {idx % 2 ? (
                <OperateCard2 data={item} />
              ) : (
                <OperateCard1 data={item} />
              )}
            </div>
          ))}
        </div>
        <div className="swiper-button-next" ref={leftRef}></div>
        <div className="swiper-button-prev" ref={rightRef}></div>
        <div className="swiper-pagination"></div>
      </div>
      <div className={styles.operateBtns}>
        <Icon
          type={'jack-zuo_3'}
          onClick={toLeft}
          className={classNames(
            styles.operateLeftIcon,
            curKey === 1 && styles.operateDisableIcon
          )}
        />
        <Icon
          type={'jack-you_3'}
          onClick={toRight}
          className={classNames(
            styles.operateRightIcon,
            curKey === datas.length - 2 && styles.operateDisableIcon
          )}
        />
      </div>
    </div>
  )
}

export default Operate

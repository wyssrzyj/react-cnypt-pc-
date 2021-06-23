import React, { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { Input, Button } from 'antd'
import styles from './index.module.less'
import * as _ from 'lodash'
import GDMap from './GDMap'
import classNames from 'classnames'
import { Icon } from '@/components'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
import 'swiper/swiper-bundle.min.css'
import SEARCH from './img/sousuo.png'
import AreaMap from './areaMap'

import IMG1 from './img/focus1.png'
import IMG2 from './img/focus2.png'
import IMG3 from './img/focus3.png'
import IMG4 from './img/focus4.png'
import IMG5 from './img/focus5.png'
import IMG6 from './img/focus6.png'
import IMG7 from './img/focus7.png'
import IMG8 from './img/focus8.png'
import IMG9 from './img/focus9.png'
import IMG10 from './img/focus10.png'
import IMG11 from './img/focus11.png'
import OIMG from './img/operateImg.png'

import SOFT1 from './img/soft1.png'
import SOFT2 from './img/soft2.png'
import SOFT3 from './img/soft3.png'
import SOFT4 from './img/soft4.png'

import COOP1 from './img/pinpai_1.png'
import COOP2 from './img/pinpai_2.png'
import COOP3 from './img/pinpai_3.png'
import COOP4 from './img/pinpai_4.png'
import COOP5 from './img/pinpai_5.png'
import COOP6 from './img/pinpai_6.png'
import COOP7 from './img/pinpai_7.png'
import COOP8 from './img/pinpai_8.png'

import FRATORY from './img/factory.png'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])
// 地图右侧工厂统计信息
const Statistics = props => {
  const { province } = props
  const configs = [
    {
      icon: 'jack-gongchang',
      field: 'a',
      text: '已入驻工厂数量'
    },
    {
      icon: 'jack-shangjia',
      field: 'b',
      text: '已入驻商家数量'
    },
    {
      icon: 'jack-shebei',
      field: 'c',
      text: '已物联设备数量'
    },
    {
      icon: 'jack-dingdan1',
      field: 'd',
      text: '已服务订单数量'
    }
  ]

  return (
    <div className={styles.statisticsModal}>
      <div>{province}</div>
      {configs.map(item => {
        return (
          <div className={styles.statisticsItem} key={item.field}>
            <Icon type={item.icon} className={styles.icon}></Icon>
            <div className={styles.msg}>
              <div>
                <span className={styles.count}>{9999} </span>
                <span>&nbsp;家</span>
              </div>
              <div>{item.text}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
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
const SwiperFactorys = () => {
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
const JoinFactorys = () => {
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
const Operate = () => {
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

// 工票软件
const Software = () => {
  const imgs = [SOFT1, SOFT2, SOFT3, SOFT4]

  return (
    <div className={styles.software}>
      <div className={styles.softwareInner}>
        <div className={styles.softIntro}>
          <div className={styles.softTitle}>工票软件</div>
          <div className={styles.softText}>WORK ORDER SOFTWARE</div>
          <div className={styles.softIntroText}>
            浙江嘉兴创展软件科技有限公司，是一家专注于智能化系统集成，企业信息化管理系统的研发、应用及信息技术管理咨询解决方案提供商，致力于将RFID（射频识别）等先进技术应用于服装生产管理领域结合信息化软件系统，引领二十一世纪服装产业革新潮流，给力服装生产企业获得领先的智能化、自动化管理技术，提升工厂效率。
          </div>
        </div>
        <div className={styles.softImgs}>
          {imgs.map((item, idx) => (
            <img src={item} key={idx} alt="" className={styles.softImg} />
          ))}
        </div>
      </div>
    </div>
  )
}

// 最新物联设备
const Equipment = () => {
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
// 合作品牌
const Cooperation = () => {
  const datas = [COOP1, COOP2, COOP3, COOP4, COOP5, COOP6, COOP7, COOP8]
  return (
    <div className={styles.cooperation}>
      <div className={styles.header}>
        <div className={styles.oTitle}>合作品牌</div>
        <div className={styles.oText}>COOPERATIVE BRAND</div>
        <img src={OIMG} alt="" className={styles.img} />
      </div>
      <div className={styles.coopImgs}>
        {datas.map((item, idx) => (
          <img src={item} key={idx + '='} alt="" className={styles.coopImg} />
        ))}
      </div>
    </div>
  )
}

// 首页页面
const HomePage = () => {
  const [province, setProvince] = useState()
  const [areaKey, setAreaKey] = useState(0) // 省份
  const [areaType, setAreaType] = useState(0) // 工厂类型

  const inputs = [
    {
      icon: <Icon type={'jack-ddsl'} className={styles.inputIcon} />,
      placeholder: '订单数量'
    },
    {
      icon: <Icon type={'jack-cplb'} className={styles.inputIcon} />,
      placeholder: '产品类别'
    },
    {
      icon: <Icon type={'jack-quyu'} className={styles.inputIcon} />,
      placeholder: '区域'
    }
  ]

  const provinceChange = useCallback(provinceInfo => {
    setProvince(provinceInfo)
  }, [])

  const valueChange = event => {
    const { value } = event.target
    console.log(value)
  }

  const areaTabs = [
    {
      area: '浙江省',
      count: 1242
    },
    {
      area: '江苏省',
      count: 1242
    },
    {
      area: '广东省',
      count: 1242
    }
  ]

  const areaBtns = [
    {
      label: '针织类',
      value: 1
    },
    {
      label: '梭织类',
      value: 2
    },
    {
      label: '其他',
      value: 3
    }
  ]

  const areaChange = key => {
    setAreaKey(key)
  }

  const areaTypeChange = key => {
    setAreaType(key)
  }

  const cityList = [
    {
      city: '杭州市',
      count: '346'
    },
    {
      city: '嘉兴市',
      count: '346'
    },
    {
      city: '湖州市',
      count: '346'
    },
    {
      city: '金华市',
      count: '346'
    },
    {
      city: '台州市',
      count: '346'
    },
    {
      city: '舟山市',
      count: '346'
    },
    {
      city: '宁波市',
      count: '346'
    },
    {
      city: '温州市',
      count: '346'
    },
    {
      city: '绍兴市',
      count: '346'
    },
    {
      city: '丽水市',
      count: '346'
    },
    {
      city: '衢州市',
      count: '346'
    }
  ]

  const focusImgs = [
    null,
    IMG1,
    null,
    IMG2,
    null,
    null,
    null,
    IMG3,
    IMG4,
    null,
    null,
    IMG5,
    IMG6,
    IMG7,
    IMG8,
    IMG9,
    null,
    IMG10,
    IMG11,
    null
  ]

  return (
    <div className={styles.container}>
      <div className={styles.homeContainer}>
        <div className={styles.headerOutBox}>
          <div className={styles.headerBox}>
            <GDMap provinceChange={provinceChange} />
            <Statistics province={province} />
          </div>
        </div>
        <SwiperFactorys />
        {/* 智能搜索工厂 */}
        {/* <div className={styles.intelligenceSearch}>
          <div className={styles.intelligenceInner}>
            <div className={styles.intelligenceLeft}>
              <img src={SEARCH} alt="" className={styles.searchImg} />
              <div className={styles.searchTitle}>智能搜索工厂</div>
              {inputs.map((item, idx) => {
                return (
                  <Input
                    prefix={item.icon}
                    key={idx}
                    placeholder={item.placeholder}
                    className={styles.input}
                    onChange={valueChange}
                  />
                )
              })}
              <Button className={styles.searchBtn}>搜索</Button>
            </div>
            <div className={styles.intelligenceRight}>
              <img src={FRATORY} className={styles.intellImg} alt="" />
            </div>
          </div>
        </div> */}
        {/* 地区工厂 */}
        {/* <div className={styles.areaFactorys}>
          <div className={styles.areaHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.areaTitle}>
                <span className={styles.areaFactory}>地区工厂</span>
                <span className={styles.areaFactoryEn}>REGIONAL FACTORIES</span>
              </div>
            </div>
            <div className={styles.areaTabs}>
              {areaTabs.map((item, idx) => {
                return (
                  <div
                    className={classNames(
                      styles.areaTab,
                      areaKey === idx ? styles.activeAreaTab : null
                    )}
                    key={idx}
                    onClick={() => areaChange(idx)}
                  >
                    <div>{item.area}</div>
                    <div>{`（${item.count}）`}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className={styles.areaContent}>
            <div className={styles.areaMap}>
              <AreaMap />
              <div className={styles.areaBtns}>
                {areaBtns.map((item, idx) => {
                  return (
                    <Button
                      key={item.value}
                      onClick={() => areaTypeChange(idx)}
                      type={areaType === idx ? 'primary' : 'default'}
                      ghost={areaType !== idx}
                      className={styles.areaBtn}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </div>
            </div>
            <div className={styles.areaList}>
              {cityList.map((item, idx) => {
                return (
                  <div key={idx} className={styles.arenItem}>
                    <div className={styles.areaCity}>{item.city}</div>
                    <div className={styles.areaCountBox}>
                      <span className={styles.areaCount}>{item.count}</span>
                      <span>家</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div> */}
        {/* 产业聚集地 */}
        {/* <div className={styles.focus}>
          <div className={styles.focusInner}>
            <div className={styles.focusLeft}>
              <div>产业聚集地</div>
              <div>INDUSTRIAL CLUSTER</div>
              <div>童装</div>
              <div>佛山 | 织里 | 石狮</div>
            </div>
            <div className={styles.focusRight}>
              {focusImgs.map(item =>
                item ? (
                  <div className={styles.focusImgBox}>
                    <img src={item} alt="" className={styles.focusImg} />
                    <div className={styles.focusMask}>
                      <div className={styles.maskTitle}>童装</div>
                      <div className={styles.maskText}>佛山 | 织里 | 石狮</div>
                    </div>
                  </div>
                ) : (
                  <div className={styles.focusImgHidden}></div>
                )
              )}
            </div>
          </div>
        </div> */}
        {/* 加盟工厂 */}
        {/* <JoinFactorys /> */}
        {/* 运营团队 */}
        {/* <Operate /> */}
        {/* 工票软件 */}
        {/* <Software /> */}
        {/* 最新物联设备 */}
        {/* <Equipment /> */}
        {/* 合作品牌 */}
        {/* <Cooperation /> */}
      </div>
    </div>
  )
}

export default HomePage

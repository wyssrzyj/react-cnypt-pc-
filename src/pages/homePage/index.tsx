import React, { useRef, useState, useEffect } from 'react'
import styles from './index.module.less'
import * as _ from 'lodash'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
import JoinFactorys from './components/joinFactorys'
import Cooperation from './components/cooperation'
import Equipment from './components/equipment'
import Software from './components/software'
import Statistics from './components/statistics'
import SwiperFactorys from './components/swiperFactorys'
import Operate from './components/operate'
import Intelligence from './components/intelligenc'
import SlideBars from './components/slideBar'
import AreaFactorys from './components/areaFactorys'
import Focus from './components/focus'

const HOME_BANNER =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210713/3e2e191baf6b4d17b9eb1839df40d396.jpg'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

// 首页页面
const HomePage = () => {
  const domRef1 = useRef<HTMLDivElement>()
  const domRef2 = useRef<HTMLDivElement>()
  const domRef3 = useRef<HTMLDivElement>()
  const domRef4 = useRef<HTMLDivElement>()
  const domRef5 = useRef<HTMLDivElement>()
  const domRef6 = useRef<HTMLDivElement>()
  const domRef7 = useRef<HTMLDivElement>()
  const domRef8 = useRef<HTMLDivElement>()
  const domMap = new Map()
  domMap.set(1, domRef1)
  domMap.set(2, domRef2)
  domMap.set(3, domRef3)
  domMap.set(4, domRef4)
  domMap.set(5, domRef5)
  domMap.set(6, domRef6)
  domMap.set(7, domRef7)
  domMap.set(8, domRef8)

  const containerRef = useRef<HTMLDivElement>()

  const [activeKey, setActiveKey] = useState(0)

  const setMove = event => {
    if (!domRef1.current) return
    const offsetTops = [
      domRef1.current.offsetTop,
      domRef2.current.offsetTop,
      domRef3.current.offsetTop,
      domRef4.current.offsetTop,
      domRef5.current.offsetTop,
      domRef6.current.offsetTop,
      domRef7.current.offsetTop,
      domRef8.current.offsetTop
    ]

    const scrollTop = event.target.scrollingElement.scrollTop

    let key = 0
    offsetTops.forEach((item, idx) => {
      if (idx === 2 && scrollTop >= item - 150) {
        key = idx + 1
      } else if (scrollTop >= item) {
        key = idx + 1
      }
    })

    setActiveKey(key)
  }

  useEffect(() => {
    window.addEventListener('scroll', setMove, true)
    return () => {
      window.removeEventListener('scroll', setMove)
    }
  }, [])

  useEffect(() => {
    const target: any = window || document.body

    target.addEventListener('load', () => {
      // target.requestIdleCallback(() => {
      //   target.scrollTo(0, 0)
      // })

      target.scrollTo(0, 0)
    })
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.homeContainer}>
        <div className={styles.headerOutBox}>
          <div className={styles.headerBox}>
            <img src={HOME_BANNER} className={styles.homeBanner} alt="" />
            {/* 加载中蒙层 */}
            {/* {!gdLoaded ? <div className={styles.mask}></div> : null} */}
            {/* <GDMap provinceChange={provinceChange} /> */}
            <Statistics />
          </div>
        </div>
        <SwiperFactorys SwiperCore={SwiperCore} />
        {/* 智能搜索工厂 */}
        <div ref={domRef1} className={styles.intelligenceSearch}>
          <Intelligence />
        </div>
        {/* 地区工厂 */}
        <div ref={domRef2} className={styles.areaFactorys}>
          <AreaFactorys />
        </div>
        {/* 产业聚集地 */}
        <div ref={domRef3} className={styles.focus}>
          <Focus />
        </div>
        {/* 加盟工厂 */}
        <div ref={domRef4} className={styles.joinFactorys}>
          <JoinFactorys SwiperCore={SwiperCore} />
        </div>
        {/* 运营团队 */}
        <div ref={domRef5} className={styles.operate}>
          <Operate SwiperCore={SwiperCore} />
        </div>
        {/* 工票软件 */}
        <div ref={domRef6} className={styles.softWare}>
          <Software />
        </div>
        {/* 最新物联设备 */}
        <div ref={domRef7} className={styles.equipment}>
          <Equipment SwiperCore={SwiperCore} />
        </div>
        {/* 合作品牌 */}
        <div ref={domRef8} className={styles.cooperation}>
          <Cooperation />
        </div>
        {/* 导航栏 */}
        <SlideBars domMap={domMap} activeKey={activeKey} />
      </div>
    </div>
  )
}

export default HomePage

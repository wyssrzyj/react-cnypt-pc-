import React, { useRef, useState, useCallback, useEffect } from 'react'
import styles from './index.module.less'
import * as _ from 'lodash'
import GDMap from './GDMap'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
import 'swiper/swiper-bundle.min.css'

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

  const [province, setProvince] = useState()
  const [activeKey, setActiveKey] = useState(0)

  useEffect(() => {
    window.addEventListener(
      'scroll',
      event => {
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
        const { scrollTop } = event.target as any
        let key
        offsetTops.forEach((item, idx) => {
          if (idx === 2 && scrollTop >= item - 150) {
            key = idx + 1
          } else if (scrollTop >= item) {
            key = idx + 1
          }
        })
        if (key !== activeKey) {
          setActiveKey(key)
        }
      },
      true
    )
  }, [])

  const provinceChange = useCallback(provinceInfo => {
    setProvince(provinceInfo)
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.homeContainer}>
        <div className={styles.headerOutBox}>
          <div className={styles.headerBox}>
            {/* 加载中蒙层 */}
            {/* {!gdLoaded ? <div className={styles.mask}></div> : null} */}
            <GDMap provinceChange={provinceChange} />
            <Statistics province={province} />
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
        <div ref={domRef4}>
          <JoinFactorys SwiperCore={SwiperCore} />
        </div>

        {/* 运营团队 */}
        <div ref={domRef5}>
          <Operate SwiperCore={SwiperCore} />
        </div>

        {/* 工票软件 */}
        <div ref={domRef6}>
          <Software />
        </div>
        {/* 最新物联设备 */}
        <div ref={domRef7}>
          <Equipment SwiperCore={SwiperCore} />
        </div>
        {/* 合作品牌 */}
        <div ref={domRef8}>
          <Cooperation />
        </div>
        {/* 导航栏 */}
        <SlideBars domMap={domMap} activeKey={activeKey} />
      </div>
    </div>
  )
}

export default HomePage

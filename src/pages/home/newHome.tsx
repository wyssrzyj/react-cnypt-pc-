import React, { useRef, useEffect, useState } from 'react'
import styles from './newHome.module.less'
import { Link } from 'react-router-dom'
import { Input, Button } from 'antd'
import SwiperFactorys from './components/swiperFactorys'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade
} from 'swiper'
import { useHistory } from 'react-router'
import { Icon } from '@/components'
import { useStores } from '@/utils/mobx'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const BANNER =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210721/db26ec69396946f5866f9681a24dd423.jpg?x-oss-process=image/quality,q_40'
export const BEFORE_IMG =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/107176f7b94f4d109551a68e046e2214.png'

const SearchBar = () => {
  const configs = [
    {
      label: '地图找厂',
      icon: 'jack-home_ditu',
      iconActive: 'jack-dituActive',
      url: '/mapSearch'
    },
    ,
    {
      label: '找订单',
      icon: 'jack-home_dingdan',
      iconActive: 'jack-dingdanActive',
      url: '/order-search'
    },
    {
      label: '智能找厂',
      icon: 'jack-home_zhineng',
      iconActive: 'jack-zhinengActive',
      url: '/factory-search'
    }
  ]

  return (
    <section className={styles.searchBar}>
      {configs.map((item, idx) => {
        return (
          <Link key={idx} to={item.url} className={styles.linkItem}>
            <Icon type={item.icon} className={styles.searchBarIcon}></Icon>
            <Icon
              type={item.iconActive}
              className={styles.searchBarIconActive}
            ></Icon>
            {item.label}
          </Link>
        )
      })}
    </section>
  )
}

const DealCount = ({ count, length }) => {
  const len = `${count}`.length
  const arr = new Array(len).fill({})

  const reduceCount = length - len
  const reduceArr = new Array(reduceCount).fill({})

  return (
    <div className={styles.dealCountBox}>
      {reduceArr.map((_item, idx) => {
        return (
          <div key={idx} className={styles.dealCount}>
            <Icon type={'jack-kapian'} className={styles.numberIcon}></Icon>
            <span className={styles.dealNumber}>{0}</span>
          </div>
        )
      })}
      {arr.map((_item, idx) => {
        return (
          <div key={idx} className={styles.dealCount}>
            <Icon type={'jack-kapian'} className={styles.numberIcon}></Icon>
            <span className={styles.dealNumber}>{`${count}`[idx]}</span>
          </div>
        )
      })}
    </div>
  )
}

const Home = () => {
  const bannerRef = useRef<any>()
  const containerRef = useRef<any>()

  const history = useHistory()
  const { commonStore, homeStore } = useStores()
  const { updateName } = commonStore
  const { getTotalCapacity } = homeStore

  const [_data, setData] = useState({})

  useEffect(() => {
    ;(async () => {
      const totalData = await getTotalCapacity()
      totalData.totalOrderBillerNum = 165
      setData(totalData)
    })()
  }, [])

  const searchFunction = () => {
    history.push('/factory-search')
  }

  const valueChange = e => {
    const value = e.target.value
    updateName(value)
  }

  const SIcon = <Icon type={'jack-search'} className={styles.searchIcon}></Icon>

  const cardConfigs = [
    {
      label: '入驻加工厂数',
      quantity: 350,
      field: 'totalFactoryNum',
      length: 5
    },
    {
      label: '入驻发单商数',
      quantity: 197,
      field: 'totalOrderBillerNum',
      length: 5
    },
    {
      label: '联网设备数',
      quantity: 24963,
      field: 'totalDeviceNum',
      length: 6
    },
    {
      label: '累计生产件数',
      quantity: 44513040,
      field: 'totalOutputNum',
      length: 9
    }
  ]

  useEffect(() => {
    bannerRef.current.onload = () => {
      containerRef.current.style.background = `url(${BANNER}) center center`
      containerRef.current.style.backgroundSize = 'cover'
    }
  }, [])

  return (
    <div className={styles.home}>
      <div className={styles.container} ref={containerRef}>
        <img src={BANNER} ref={bannerRef} className={styles.banner} alt="" />
        <div className={styles.content}>
          <SearchBar></SearchBar>
          <div className={styles.searchBox}>
            <div className={styles.inputBox}>
              <div className={styles.mask}></div>
              <Input
                onChange={valueChange}
                onPressEnter={searchFunction}
                className={styles.input}
                placeholder={'请输入加工厂信息'}
                prefix={SIcon}
              />
            </div>
            <Button
              className={styles.btn}
              type={'primary'}
              onClick={searchFunction}
            >
              搜索
            </Button>
          </div>

          <div className={styles.cards}>
            {cardConfigs.map((item, idx) => {
              return (
                <div className={styles.card} key={idx}>
                  <div className={styles.cardTitle}>{item.label}</div>
                  <div>
                    <DealCount
                      length={item.length}
                      count={item.quantity || 0}
                    ></DealCount>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <SwiperFactorys SwiperCore={SwiperCore} />
      </div>
    </div>
  )
}

export default Home

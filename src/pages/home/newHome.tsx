import React from 'react'
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

const SearchBar = () => {
  const configs = [
    {
      label: '地图找厂',
      icon: 'jack-ditu',
      url: '/factory-search'
    },
    {
      label: '智能找厂',
      icon: 'jack-dingdan3',
      url: '/factory-search'
    },
    {
      label: '订单找厂',
      icon: 'jack-dingdan3',
      url: '/factory-search'
    }
  ]

  return (
    <section className={styles.searchBar}>
      {configs.map((item, idx) => {
        return (
          <Link key={idx} to={item.url} className={styles.linkItem}>
            <Icon type={item.icon} className={styles.searchBarIcon}></Icon>
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
  const history = useHistory()
  const { commonStore } = useStores()
  const { updateName } = commonStore

  const searchFunction = () => {
    history.push('/factory-search')
  }

  const valueChange = e => {
    const value = e.target.value
    updateName(value)
  }

  const SIcon = <Icon type={'jack-search'} className={styles.searchIcon}></Icon>

  const cardConfigs = [
    { label: '入驻加工厂数', field: 'a', length: 5 },
    { label: '入驻发单商数', field: 'b', length: 5 },
    { label: '联网设备数', field: 'c', length: 6 },
    { label: '累计生产件数', field: 'd', length: 6 }
  ]

  const counts = {
    a: 558,
    b: 352,
    c: 9060,
    d: 29066
  }

  return (
    <div className={styles.home}>
      <div className={styles.container}>
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
                    count={counts[item.field]}
                  ></DealCount>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <SwiperFactorys SwiperCore={SwiperCore} />
      </div>
    </div>
  )
}

export default Home

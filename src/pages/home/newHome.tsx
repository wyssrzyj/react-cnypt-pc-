import React, { useState } from 'react'
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
import H1 from './img/h1.png'
import H2 from './img/h2.png'
import H3 from './img/h3.png'
import HB1 from './img/hb1.png'
import HB2 from './img/hb2.png'
import HB3 from './img/hb3.png'
import HB4 from './img/hb4.png'
import { useHistory } from 'react-router'

import { Icon } from '@/components'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade])

const SearchBar = () => {
  const configs = [
    {
      label: '地图找厂',
      img: H1,
      url: '/factory-search'
    },
    {
      label: '智能找厂',
      img: H2,
      url: '/factory-search'
    },
    {
      label: '订单找厂',
      img: H3,
      url: '/factory-search'
    }
  ]

  return (
    <section className={styles.searchBar}>
      {configs.map((item, idx) => {
        return (
          <Link key={idx} to={item.url} className={styles.linkItem}>
            <img src={item.img} alt="" className={styles.linkImg} />
          </Link>
        )
      })}
    </section>
  )
}

const Home = () => {
  const [val, setVal] = useState()

  const history = useHistory()

  const searchFunction = () => {
    console.log(val)
    history.push('/factory-search')
  }

  const valueChange = e => {
    const value = e.target.value
    setVal(value)
  }

  const SIcon = <Icon type={'jack-search'} className={styles.searchIcon}></Icon>

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        <SearchBar></SearchBar>
        <div className={styles.searchBox}>
          <Input
            onChange={valueChange}
            onPressEnter={searchFunction}
            className={styles.input}
            placeholder={'请输入加工厂信息'}
            prefix={SIcon}
          />
          <Button
            className={styles.btn}
            type={'primary'}
            onClick={searchFunction}
          >
            搜索
          </Button>
        </div>

        <div className={styles.hbBox}>
          <img src={HB1} className={styles.hb} alt="" />
          <img src={HB2} className={styles.hb} alt="" />
          <img src={HB3} className={styles.hb} alt="" />
          <img src={HB4} className={styles.hb} alt="" />
        </div>
      </div>
      <div className={styles.swiperContainer}>
        <SwiperFactorys SwiperCore={SwiperCore} />
      </div>
    </div>
  )
}

export default Home

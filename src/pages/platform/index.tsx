import { Search } from '@/components'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import styles from './index.module.less'
import Loadable from '@/utils/loadable'

// home
const Home = Loadable({
  loader: () => import('@/pages/home'),
})

// 工厂首页
const FactoryPage = Loadable({
  loader: () => import('@/pages/factoryPage'),
})

// 工厂查询
const Factory = Loadable({
  loader: () => import('@/pages/factory'),
})

// 订单
const Order = Loadable({
  loader: () => import('@/pages/orderPage'),
})

// 订单搜索
const OrderSearch = Loadable({
  loader: () => import('@/pages/order'),
})

const HomePage = () => {
  return (
    <div className={styles.platformContent}>
      <Search></Search>
      <Switch>
        <Route path="/platform/home" component={Home} />
        <Route path="/platform/factory" component={FactoryPage} />
        <Route path="/platform/order" component={Order} />
        <Route path="/platform/factory-search" component={Factory} />
        <Route path="/platform/order-search" component={OrderSearch} />
        <Redirect to="/platform/home" />
      </Switch>
    </div>
  )
}

export default HomePage

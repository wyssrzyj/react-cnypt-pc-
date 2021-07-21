import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Loadable from '@/utils/loadable'

// homePage 地图
const HomePage = Loadable({
  loader: () => import('@/pages/home/newHome')
})

// note
const Note = Loadable({
  loader: () => import('@/pages/note')
})

// 登录 注册页
const LoginAndRegister = Loadable({
  loader: () => import('@/pages/login')
})

// 工厂详情
const FactoryDetail = Loadable({
  loader: () => import('@/pages/factoryDetail')
})

// 订单详情
const OrderDetail = Loadable({
  loader: () => import('@/pages/orderDetail')
})

// 首页 订单 工厂
const Platform = Loadable({
  loader: () => import('@/pages/platform')
})

// 控制台
const ControlPanel = Loadable({
  loader: () => import('@/pages/controlPanel')
})

// 高德地图
const GDMap = Loadable({
  loader: () => import('@/pages/homePage/GDMap')
})

// Excel
const Excel = Loadable({
  loader: () => import('@/pages/homePage/excel')
})

// NotFound
const NotFound = Loadable({
  loader: () => import('@/components/404')
})

const RouteList = () => {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/factory-search" component={Platform} />
      <Route path="/note" component={Note} />
      <Route path="/user" component={LoginAndRegister} />
      <Route path="/order-detail" component={OrderDetail} />
      <Route path="/factory-detail/:id" component={FactoryDetail} />
      <Route path="/control-panel" component={ControlPanel} />
      <Route path="/GDMap" component={GDMap} />
      <Route path="/excel" component={Excel} />
      <Route path="*" component={NotFound} />
    </Switch>
  )
}

export default compose(withRouter)(RouteList)

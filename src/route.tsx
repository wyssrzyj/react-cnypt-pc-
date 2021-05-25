import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Loadable from '@/utils/loadable'

// home
const Home = Loadable({
  loader: () => import('@/pages/home'),
  loading: () => null,
})

// note
const Note = Loadable({
  loader: () => import('@/pages/note'),
  loading: () => null,
})

// 登录页
const Login = Loadable({
  loader: () => import('@/pages/login'),
  loading: () => null,
})

// 注册页
const Register = Loadable({
  loader: () => import('@/pages/register'),
  loading: () => null,
})

// 工厂首页
const FactoryPage = Loadable({
  loader: () => import('@/pages/factoryPage'),
  loading: () => null,
})

// 工厂查询
const Factory = Loadable({
  loader: () => import('@/pages/factory'),
  loading: () => null,
})

// 工厂详情
const FactoryDetail = Loadable({
  loader: () => import('@/pages/factoryDetail'),
  loading: () => null,
})

// 订单
const Order = Loadable({
  loader: () => import('@/pages/orderPage'),
})

// 订单搜索
const OrderSearch = Loadable({
  loader: () => import('@/pages/order'),
  loading: () => null,
})

// 订单详情
const OrderDetail = Loadable({
  loader: () => import('@/pages/orderDetail'),
  loading: () => null,
})

// 订单详情
const Platform = Loadable({
  loader: () => import('@/pages/platform'),
  loading: () => null,
})

const RouteList = () => {
  return (
    <Switch>
      <Route path="/platform" component={Platform} />
      <Route path="/home" component={Home} />
      <Route path="/note" component={Note} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/order" component={Order} />
      <Route path="/order-detail" component={OrderDetail} />
      <Route path="/factory" component={FactoryPage} />
      <Route path="/factory-detail" component={FactoryDetail} />
      <Redirect to="/platform" />
    </Switch>
  )
}

export default compose(withRouter)(RouteList)

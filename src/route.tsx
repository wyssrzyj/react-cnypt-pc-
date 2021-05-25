import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Loadable from '@/utils/loadable'

// home
const Home = Loadable({
  loader: () => import('@/pages/home'),
})

// note
const Note = Loadable({
  loader: () => import('@/pages/note'),
})

// 登录页
const Login = Loadable({
  loader: () => import('@/pages/login'),
})

// 注册页
const Register = Loadable({
  loader: () => import('@/pages/register'),
})

// 工厂详情
const FactoryDetail = Loadable({
  loader: () => import('@/pages/factoryDetail'),
})

// 订单详情
const OrderDetail = Loadable({
  loader: () => import('@/pages/orderDetail'),
})

// 首页 订单 工厂
const Platform = Loadable({
  loader: () => import('@/pages/platform'),
})

const RouteList = () => {
  return (
    <Switch>
      <Route path="/platform" component={Platform} />
      <Route path="/home" component={Home} />
      <Route path="/note" component={Note} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/order-detail" component={OrderDetail} />
      <Route path="/factory-detail" component={FactoryDetail} />
      <Redirect to="/platform" />
    </Switch>
  )
}

export default compose(withRouter)(RouteList)

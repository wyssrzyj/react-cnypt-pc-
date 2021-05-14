import React from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router'
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

// 工厂
const Factory = Loadable({
  loader: () => import('@/pages/factory'),
  loading: () => null,
})

// 订单
const Order = Loadable({
  loader: () => import('@/pages/order'),
  loading: () => null,
})

const RouteList = () => {
  return (
    <Switch>
      <Route path="/home" component={Home} />
      <Route path="/note" component={Note} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/order" component={Order} />
      <Route path="/factory" component={Factory} />
      <Redirect to="/home" />
    </Switch>
  )
}

export default compose(withRouter)(RouteList)

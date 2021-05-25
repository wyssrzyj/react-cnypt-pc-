import { Search } from '@/components'
import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
import Home from '@/pages/home'
import Factory from '@/pages/factoryPage'
import Order from '@/pages/orderPage'
import styles from './index.module.less'

const HomePage = () => {
  return (
    <div className={styles.platformContent}>
      <Search></Search>
      <Switch>
        <Route path="/platform/home" component={Home} />
        <Route path="/platform/factory" component={Factory} />
        <Route path="/platform/order" component={Order} />
        <Redirect to="/platform/home" />
      </Switch>
    </div>
  )
}

export default HomePage

import React from 'react'
import LoginContent from './content'
import Register from '@/pages/register'
import Reset from './reset'
import styles from './index.module.less'
import { Route, Switch, Redirect } from 'react-router-dom'

const LoginAndRegister = () => {
  return (
    <div className={styles.content}>
      <div className={styles.banner}></div>
      <Switch>
        <Route path="/user/login" component={LoginContent} />
        <Route path="/user/register" component={Register} />
        <Route path="/user/reset" component={Reset} />
        <Redirect to="/user/login" />
      </Switch>
    </div>
  )
}

export default LoginAndRegister

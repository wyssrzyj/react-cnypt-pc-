import React from 'react'
import LoginContent from './content'
import Register from '@/pages/register'
import Reset from './reset'
import styles from './index.module.less'
import { Route, Switch, Redirect } from 'react-router-dom'
import { useHistory } from 'react-router'

const LoginAndRegister = () => {
  const history = useHistory()

  const toHome = () => {
    history.push('/')
  }

  return (
    <div className={styles.content}>
      <div className={styles.editionCenter}>
        <div className={styles.banner}>
          <div onClick={toHome} className={styles.bannerLeft}></div>
          <div className={styles.location}>
            <Switch>
              <Route path="/user/login" component={LoginContent} />
              <Route path="/user/register" component={Register} />
              <Route path="/user/reset" component={Reset} />
              <Redirect to="/user/login" />
            </Switch>
          </div>
        </div>
      </div>

      {/* </div> */}
    </div>
  )
}

export default LoginAndRegister

import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './index.module.less'
import { useLocation, useHistory } from 'react-router'
import classNames from 'classnames'
import { getUserInfo } from '@/utils/tool'

const Factory = React.lazy(() => import('./enterpriseHome/factory'))
const Business = React.lazy(() => import('./enterpriseHome/business'))
const PutManage = React.lazy(() => import('./putManage'))
const ReceiveManage = React.lazy(() => import('./receiveManage'))
const OrderPage = React.lazy(() => import('./orderPage'))
const ProductPage = React.lazy(() => import('./productPage'))

const LOGO =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png'

const routeMap = new Map()
routeMap.set(0, Factory)
routeMap.set(1, Business)

const ControlPanel = React.lazy(() => import('./controlPanel'))

const EnterpriseHome = () => {
  const location = useLocation()
  const history = useHistory()
  const [userInfo, setUserInfo] = useState({ enterpriseType: null })

  useEffect(() => {
    console.log(location, 'location')
    setTimeout(() => {
      const info = getUserInfo()
      setUserInfo(info)
    }, 50)
  }, [])

  const toTarget = type => {
    type === 'control' && history.push('/control-panel/panel/account')
    type === 'put' && history.push('/control-panel/put-manage')
    type === 'receive' && history.push('/control-panel/receive-manage')
    type === 'home' && history.push('/control-panel/home')
  }

  return (
    <div className={styles.container}>
      <div className={styles.navBarOut}>
        <div className={styles.navBar}>
          <img src={LOGO} alt="" className={styles.navLogo} />
          <div className={styles.navs}>
            {userInfo.enterpriseType !== null ? (
              <div
                className={classNames(
                  styles.navItem,
                  location.pathname === '/control-panel/home'
                    ? styles.activeNavItem
                    : ''
                )}
                onClick={() => toTarget('home')}
              >
                首页
              </div>
            ) : null}

            <div
              className={classNames(
                styles.navItem,
                location.pathname === '/control-panel/receive-manage'
                  ? styles.activeNavItem
                  : ''
              )}
              onClick={() => toTarget('receive')}
            >
              接单管理
            </div>

            <div
              className={classNames(
                styles.navItem,
                location.pathname === '/control-panel/put-manage' ||
                  location.pathname.includes('/control-panel/order')
                  ? styles.activeNavItem
                  : ''
              )}
              onClick={() => toTarget('put')}
            >
              发单管理
            </div>

            <div
              className={classNames(
                styles.navItem,
                location.pathname.includes('/control-panel/panel')
                  ? styles.activeNavItem
                  : ''
              )}
              onClick={() => toTarget('control')}
            >
              设置
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <Switch>
          <Route path="/control-panel/panel" component={ControlPanel} />
          <Route path="/control-panel/put-manage" component={PutManage} />
          <Route
            path="/control-panel/receive-manage"
            component={ReceiveManage}
          />
          <Route
            path="/control-panel/home"
            component={routeMap.get(+userInfo.enterpriseType)}
          />
          <Route path="/control-panel/order/:type" component={OrderPage} />
          <Route path="/control-panel/product/:type" component={ProductPage} />
        </Switch>
      </div>
    </div>
  )
}

export default EnterpriseHome

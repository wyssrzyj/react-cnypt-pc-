import React from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './index.module.less'
import { useLocation, useHistory } from 'react-router'
import classNames from 'classnames'
import { getUserInfo } from '@/utils/tool'

const Factory = React.lazy(() => import('./factory'))
const Business = React.lazy(() => import('./business'))

const LOGO =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png'

// const paths = ['/control-panel/factory', '/control-panel/business']
const paths = ['/control-panel/home']
const routeMap = new Map()
routeMap.set(0, Factory)
routeMap.set(1, Business)

const ControlPanel = React.lazy(() => import('@/pages/controlPanel'))

// const pathMap = new Map()
// pathMap.set(0, '/control-panel/factory')
// pathMap.set(1, '/control-panel/business')

const EnterpriseHome = () => {
  const location = useLocation()
  const history = useHistory()
  const flag = paths.includes(location.pathname)
  const userInfo = getUserInfo()

  const toTarget = type => {
    // const path = pathMap.get(+userInfo.enterpriseType)
    type === 'control' && history.push('/control-panel/panel/account')
    type !== 'control' && history.push('/control-panel/home')
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
                  flag ? styles.activeNavItem : ''
                )}
                onClick={toTarget}
              >
                首页
              </div>
            ) : null}

            <div
              className={classNames(
                styles.navItem,
                !flag ? styles.activeNavItem : ''
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
          <Route
            path="/control-panel/home"
            component={routeMap.get(+userInfo.enterpriseType)}
          />
          {/* <Route path="/control-panel/factory" component={Factory} />
          <Route path="/control-panel/business" component={Business} /> */}
        </Switch>
      </div>
    </div>
  )
}

export default EnterpriseHome

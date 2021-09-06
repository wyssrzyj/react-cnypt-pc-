import React, { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './index.module.less'
import { useLocation, useHistory } from 'react-router'
import classNames from 'classnames'
import { getUserInfo } from '@/utils/tool'

const Factory = React.lazy(() => import('./enterpriseHome/factory'))
const Business = React.lazy(() => import('./enterpriseHome/business'))
const Issueabill = React.lazy(() => import('./Issueabill'))

const LOGO =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png'

const paths = ['/control-panel/home']
const routeMap = new Map()
routeMap.set(0, Factory)
routeMap.set(1, Business)

const ControlPanel = React.lazy(() => import('./controlPanel'))

const EnterpriseHome = () => {
  const location = useLocation()
  const history = useHistory()
  const flag = paths.includes(location.pathname)
  const [userInfo, setUserInfo] = useState({ enterpriseType: null })

  useEffect(() => {
    setTimeout(() => {
      const info = getUserInfo()
      setUserInfo(info)
    }, 50)
  }, [])

  const toTarget = type => {
    type === 'control' && history.push('/control-panel/panel/account')
    type !== 'control' && history.push('/control-panel/home')
    type === 'Issueabill' && history.push('/control-panel/Issueabill')
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
              onClick={() => toTarget('Issueabill')}
            >
              发单管理
            </div>
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
          <Route path="/control-panel/Issueabill" component={Issueabill} />
          <Route path="/control-panel/panel" component={ControlPanel} />
          <Route
            path="/control-panel/home"
            component={routeMap.get(+userInfo.enterpriseType)}
          />
        </Switch>
      </div>
    </div>
  )
}

export default EnterpriseHome

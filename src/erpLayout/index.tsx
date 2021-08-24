import React, { ReactElement } from 'react'
// import { useHistory } from 'react-router'
import Header from './header'
// import { useStores } from '@/utils/mobx'
import styles from './index.module.less'
import { withRouter, RouteComponentProps } from 'react-router'
import Menu from './menu'
// import { getToken } from '@/utils/tool'
import classNames from 'classnames'

interface LayoutProps extends RouteComponentProps {
  children: ReactElement<any, any>
}

const Layout = (props: LayoutProps) => {
  // const history = useHistory()
  // const { location } = props
  // const { pathname } = location

  // const isLogin = getToken()

  // if (!isLogin) {
  //   !pathname.includes('/login') && history.push('/login')
  // }

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <Menu />
        <div className={classNames(styles.content)}>{props.children}</div>
      </div>
    </div>
  )
}

export default withRouter(Layout)

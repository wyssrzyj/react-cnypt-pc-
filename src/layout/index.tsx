import React, { ReactElement } from 'react'
import Header from './newHeader'
import styles from './index.module.less'
import { withRouter, RouteComponentProps } from 'react-router'
import Footer from './footer'

interface LayoutProps extends RouteComponentProps {
  children: ReactElement<any, any>
}

const Layout = (props: LayoutProps) => {
  const { location } = props
  const { pathname } = location
  const noUseHeaders = ['/login', '/register'] // 不展示首页header的路由列表

  return (
    <div className={styles.container}>
      {!noUseHeaders.includes(pathname) && <Header />}
      <div className={styles.content}>{props.children}</div>
      <Footer></Footer>
    </div>
  )
}

export default withRouter(Layout)

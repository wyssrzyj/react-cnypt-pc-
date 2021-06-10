import React, { ReactElement, useEffect } from 'react'
import { useStores } from '@/utils/mobx'
import Header from './newHeader'
import styles from './index.module.less'
import { withRouter, RouteComponentProps } from 'react-router'
import Footer from './footer'

interface LayoutProps extends RouteComponentProps {
  children: ReactElement<any, any>
}

const Layout = (props: LayoutProps) => {
  const { commonStore } = useStores()
  const { allDictionary } = commonStore
  const { location } = props
  const { pathname } = location
  const noUseHeaders = ['/login', '/register'] // 不展示首页header的路由列表

  useEffect(() => {
    ;(async () => {
      await allDictionary([])
    })()
  }, [])

  return (
    <div className={styles.container}>
      {!noUseHeaders.includes(pathname) && <Header />}
      <div className={styles.content}>{props.children}</div>
      <Footer></Footer>
    </div>
  )
}

export default withRouter(Layout)

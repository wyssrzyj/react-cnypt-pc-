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
  const { allDictionary, getAllArea } = commonStore
  const { location } = props
  const { pathname } = location
  const noUseHeaders = [
    '/user/login',
    '/user/register',
    '/user/reset',
    '/control-panel'
  ] // 不展示header的路由列表
  const noUseFooters = ['/user/login', '/user/register', '/user/reset'] // 不展示footer的路由列表

  useEffect(() => {
    ;(window as any).requestIdleCallback(async () => {
      await allDictionary([])
      await getAllArea()
    })
  }, [])

  const headerFlag = noUseHeaders.some(item => pathname.includes(item))

  return (
    <div className={styles.container}>
      {!headerFlag && <Header />}
      <div className={styles.content}>{props.children}</div>
      {!noUseFooters.includes(pathname) && <Footer />}
    </div>
  )
}

export default withRouter(Layout)

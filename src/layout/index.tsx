import React, { ReactElement, useEffect } from 'react'
import { useStores } from '@/utils/mobx'
import Header from './header'
import styles from './index.module.less'
import { withRouter, RouteComponentProps } from 'react-router'
import Footer from './footer'
import { getCurrentUser } from '@/utils/tool'

interface LayoutProps extends RouteComponentProps {
  children: ReactElement<any, any>
}

const Layout = (props: LayoutProps) => {
  const currentUser = getCurrentUser()
  const { commonStore, loginStore, factoryStore } = useStores()
  const { allDictionary, getAllArea } = commonStore
  const { productCategory } = factoryStore
  const { userInfo } = loginStore
  const { location } = props
  const { pathname } = location
  const noUseHeaders = [
    // '/user/login',
    // '/user/register',
    // '/user/reset',
    '/mapSearch'
    // '/control-panel'
  ] // 不展示header的路由列表
  const noUseFooters = [
    // '/user/login',
    // '/user/register',
    // '/user/reset',
    '/mapSearch'
  ] // 不展示footer的路由列表
  const noNeedUserInfo = [
    '/user/login',
    '/user/register',
    '/user/reset',
    '/mapSearch'
  ]

  useEffect(() => {
    const infoFlag = noNeedUserInfo.some(item => pathname.includes(item))
    ;(async () => {
      currentUser.userId && !infoFlag && (await userInfo())
      await allDictionary([])
      await getAllArea()
      await productCategory()
    })()
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

import React, { Suspense } from 'react'
import styles from './newHome.module.less'
// import LOADING from '@/utils/psketch.png-2.gif'

const LOADING =
  'http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210730/a1c35459662045c986e0298759f70f70.gif'

const LazyHome = React.lazy(() => import('./newHome'))

export const Loading = () => {
  return (
    <div className={styles.loadingBox}>
      <img className={styles.loadingImg} src={LOADING} alt="" />
    </div>
  )
}

const RenderHome = () => {
  return (
    <Suspense fallback={<Loading></Loading>}>
      <LazyHome></LazyHome>
    </Suspense>
  )
}

export default RenderHome

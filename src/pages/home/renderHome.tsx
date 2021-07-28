import React, { Suspense } from 'react'
import styles from './newHome.module.less'
import LOADING from '@/utils/psketch.png-2.gif'

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

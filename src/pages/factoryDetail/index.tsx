import React from 'react'
import { DetailHeader } from '@/components'
import {
  FactoryInfo,
  FactoryIntroduce,
  EnterpriseHonesty,
  SamplesShow,
} from './components'
import styles from './index.module.less'

const FactoryDetail = () => {
  return (
    <div className={styles.factoryDetail}>
      <DetailHeader />
      <div className={styles.detailContainer}>
        <FactoryInfo />
        <FactoryIntroduce />
        <EnterpriseHonesty />
        <SamplesShow />
      </div>
    </div>
  )
}

export default FactoryDetail

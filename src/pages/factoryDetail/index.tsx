import React from 'react'
import { DetailHeader } from '@/components'
import { FactoryInfo, FactoryIntroduce, EnterpriseHonesty } from './components'
import styles from './index.module.less'

const FactoryDetail = () => {
  return (
    <div className={styles.factoryDetail}>
      <DetailHeader />
      <div className={styles.detailContainer}>
        <FactoryInfo />
        <FactoryIntroduce />
        <EnterpriseHonesty />
      </div>
    </div>
  )
}

export default FactoryDetail

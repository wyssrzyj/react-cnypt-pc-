import React from 'react'
import { useHistory } from 'react-router'
import { useStores } from '@/utils/mobx'
import { DetailHeader } from '@/components'
import { FactoryInfo, FactoryIntroduce, EnterpriseHonesty, SamplesShow } from './components'
import styles from './index.module.less'

const FactoryDetail = props => {
  const { commonStore } = useStores()
  const { updateName } = commonStore
  const history = useHistory()
  const {
    match: { params = {} }
  } = props
  const searchFactory = name => {
    updateName(name)
    history.push('/platform/factory-search')
  }
  return (
    <div className={styles.factoryDetail}>
      <DetailHeader search={searchFactory} />
      <div className={styles.detailContainer}>
        <FactoryInfo factoryId={params.id} />
        <FactoryIntroduce factoryId={params.id} />
        <EnterpriseHonesty />
        <SamplesShow />
      </div>
    </div>
  )
}

export default FactoryDetail

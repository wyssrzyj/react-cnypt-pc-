import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import { Overview, EnterpriseInformation } from './components'
import { DetailHeader, TabHeader } from '@/components'
import styles from './index.module.less'
import ProductDynamic from './productDynamic'

const tabOptions = [
  {
    value: 'dynamic',
    label: '生产动态'
  },
  {
    value: 'info',
    label: '企业信息'
  }
]

const titleMap = new Map()
titleMap.set('dynamic', '产能云平台-工厂详情-生产动态')
titleMap.set('info', '产能云平台-工厂详情-企业信息')

const FactoryDetail = props => {
  const {
    match: { params = {} }
  } = props
  const { id: factoryId } = params
  const history = useHistory()
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const { commonStore } = useStores()
  const { updateName } = commonStore
  const [factoryInfo, setFactoryInfo] = useState<any>({})
  const [activeTab, setActiveTab] = useState('dynamic')

  useEffect(() => {
    document.title = titleMap.get(activeTab)

    return () => {
      document.title = '产能云平台'
    }
  }, [activeTab])

  const getFactoryInfo = () => {
    axios
      .post('/api/factory/info/get-details-enterprise-desc', {
        dictCode: 'factory_tag',
        factoryId,
        userId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          setFactoryInfo({ ...data })
        }
      })
  }

  const handleSearch = value => {
    updateName(value)
    history.push('/factory-search')
  }

  useEffect(() => {
    getFactoryInfo()
  }, [])

  return (
    <div className={styles.factoryDetail}>
      <DetailHeader search={handleSearch} />
      <div className={styles.container}>
        {/* 工厂概览 */}
        {!isEmpty(factoryInfo) && (
          <Overview factoryId={factoryId} current={factoryInfo} />
        )}
        {/* tab切换栏 */}
        <TabHeader
          options={tabOptions}
          activeTab={activeTab}
          onTabChange={key => setActiveTab(key)}
        />
        {/* 生产动态 */}
        {activeTab === 'dynamic' && <ProductDynamic factoryId={factoryId} />}
        {/* 企业信息 */}
        {activeTab === 'info' && (
          <EnterpriseInformation factoryId={factoryId} current={factoryInfo} />
        )}
      </div>

      {/* 导航栏 */}
    </div>
  )
}

export default FactoryDetail
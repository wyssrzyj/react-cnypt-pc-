import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router'
import axios from '@/utils/axios'
import { getCurrentUser, getUserInfo } from '@/utils/tool'
import { observer, useStores } from '@/utils/mobx'
import { Overview, EnterpriseInformation, ContactCom } from './components'
import { DetailHeader, TabHeader } from '@/components'
import styles from './index.module.less'
import ProductDynamic from './productDynamic'

const initTabOptions = [
  {
    value: 'dynamic',
    label: '生产动态'
  },
  {
    value: 'info',
    label: '企业信息'
  },
  {
    value: 'contact',
    label: '联系方式'
  }
]

const titleMap = new Map()
titleMap.set('dynamic', '产能云平台-工厂详情-生产动态')
titleMap.set('info', '产能云平台-工厂详情-企业信息')
titleMap.set('contact', '产能云平台-工厂详情-联系方式')

const FactoryDetail = props => {
  const {
    match: { params = {} }
  } = props
  const { id: factoryId } = params
  const history = useHistory()
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const userInfo = getUserInfo() || {}
  const { enterpriseId } = userInfo
  const { commonStore, factoryStore } = useStores()
  const { updateName } = commonStore
  const [factoryInfo, setFactoryInfo] = useState<any>({})
  const [activeTab, setActiveTab] = useState('dynamic')
  const [tabOptions, setTabOptions] = useState(initTabOptions)

  const { getFactoryData, getFactoryMachineData, getFactoryBoard } =
    factoryStore

  useEffect(() => {
    ;(async () => {
      const res1 = await getFactoryData(factoryId)
      const res2 = await getFactoryMachineData(factoryId)
      const res3 = await getFactoryBoard(factoryId)

      const flag = res1 === null && res2 === null && res3 === null
      if (flag) {
        setTabOptions([
          {
            value: 'info',
            label: '企业信息'
          }
        ])
        setActiveTab('info')
      }
      if (!flag) {
        setTabOptions([...initTabOptions])
        setActiveTab('dynamic')
      }
    })()
  }, [factoryId])

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
        {activeTab === 'dynamic' && <ProductDynamic />}
        {/* 企业信息 */}
        {activeTab === 'info' && (
          <EnterpriseInformation factoryId={factoryId} current={factoryInfo} />
        )}
        {/* 联系方式 */}
        {activeTab === 'contact' && <ContactCom enterpriseId={enterpriseId} />}
      </div>

      {/* 导航栏 */}
    </div>
  )
}

export default observer(FactoryDetail)

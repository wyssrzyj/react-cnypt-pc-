import React, { useRef, useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { useHistory } from 'react-router'
import SlideBars from '../homePage/components/slideBar'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import { useStores } from '@/utils/mobx'
import {
  Overview,
  EnterpriseInformation
  // CompaniesIntroduce,
  // CommercialInfo,
  // OrderInfo,
  // Digital,
  // WorkshopEquipment,
  // QualificationCertificate
} from './components'
import { DetailHeader, TabHeader } from '@/components'
import styles from './index.module.less'

const barList = [
  { label: '企业介绍' },
  { label: '工商信息' },
  { label: '生产接单介绍' },
  { label: '企业数字化' },
  { label: '车间设备' },
  { label: '资质证书' }
]
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
  const [activeKey, setActiveKey] = useState(0)
  const [activeTab, setActiveTab] = useState('info')

  const domRef1 = useRef<HTMLDivElement>()
  const domRef2 = useRef<HTMLDivElement>()
  const domRef3 = useRef<HTMLDivElement>()
  const domRef4 = useRef<HTMLDivElement>()
  const domRef5 = useRef<HTMLDivElement>()
  const domRef6 = useRef<HTMLDivElement>()
  const domMap = new Map()
  domMap.set(1, domRef1)
  domMap.set(2, domRef2)
  domMap.set(3, domRef3)
  domMap.set(4, domRef4)
  domMap.set(5, domRef5)
  domMap.set(6, domRef6)

  const setMove = event => {
    if (!domRef1.current) return
    const offsetTops = [
      domRef1.current.offsetTop,
      domRef2.current.offsetTop,
      domRef3.current.offsetTop,
      domRef4.current.offsetTop,
      domRef5.current.offsetTop,
      domRef6.current.offsetTop
    ]

    const scrollTop = event.target.scrollingElement.scrollTop

    let key = 0
    offsetTops.forEach((item, idx) => {
      if (idx === 2 && scrollTop >= item - 150) {
        key = idx + 1
      } else if (scrollTop >= item) {
        key = idx + 1
      }
    })
    if (key !== activeKey) {
      setActiveKey(key)
    }
  }

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
    window.addEventListener('scroll', setMove, true)

    return () => {
      window.removeEventListener('scroll', setMove)
    }
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
        {/* 企业信息 */}
        {activeTab === 'info' && (
          <EnterpriseInformation factoryId={factoryId} current={factoryInfo} />
        )}
      </div>

      {/* 导航栏 */}
      <SlideBars barList={barList} domMap={domMap} activeKey={activeKey} />
    </div>
  )
}

export default FactoryDetail

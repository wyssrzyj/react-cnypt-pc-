import React, { useRef, useState, useEffect } from 'react'
// import { Tabs } from 'antd'
import { isEmpty } from 'lodash'
import SlideBars from '../homePage/components/slideBar'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'
import {
  Overview,
  CompaniesIntroduce,
  CommercialInfo,
  OrderInfo,
  Digital,
  WorkshopEquipment,
  QualificationCertificate,
  ProductEffect,
  MonthProduceChart,
  PieChart,
  MoveChart,
  PassPercent,
  PresserFoot,
  PinNumber,
  ShearLine
} from './components'
import styles from './index.module.less'

const barList = [
  { label: '企业介绍' },
  { label: '工商信息' },
  { label: '生产接单介绍' },
  { label: '企业数字化' },
  { label: '车间设备' },
  { label: '资质证书' }
]

const FactoryDetail = props => {
  const {
    match: { params = {} }
  } = props
  const { id: factoryId } = params
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const [factoryInfo, setFactoryInfo] = useState<any>({})
  const [activeKey, setActiveKey] = useState(0)

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

  useEffect(() => {
    getFactoryInfo()
    window.addEventListener('scroll', setMove, true)

    return () => {
      window.removeEventListener('scroll', setMove)
    }
  }, [])

  return (
    <div className={styles.factoryDetail}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.left}>
            {factoryInfo.logoUrl ? (
              <img className={styles.logo} src={factoryInfo.logoUrl} alt="" />
            ) : null}

            <span className={styles.name}>{factoryInfo.enterpriseName}</span>
          </div>
          <div className={styles.right}>
            <div className={styles.active}>企业信息</div>
          </div>
        </div>
      </header>

      <div className={styles.charts}>
        <PieChart></PieChart>
        <MoveChart></MoveChart>
        <MonthProduceChart></MonthProduceChart>
        <ProductEffect></ProductEffect>
        <PassPercent></PassPercent>
        <PinNumber></PinNumber>
        <ShearLine></ShearLine>
        <PresserFoot></PresserFoot>
      </div>

      <div className={styles.homeContainer}>
        {!isEmpty(factoryInfo) && (
          <Overview factoryId={factoryId} current={factoryInfo} />
        )}

        {/* 企业介绍 */}
        <div ref={domRef1} className={styles.intelligenceSearch}>
          <CompaniesIntroduce
            factoryId={factoryId}
            current={factoryInfo}
            update={getFactoryInfo}
          />
        </div>

        {/* 工商信息 */}
        <div ref={domRef2} className={styles.areaFactorys}>
          <CommercialInfo factoryId={factoryId} />
        </div>
        {/* 生产接单介绍 */}
        <div ref={domRef3} className={styles.focus}>
          <OrderInfo factoryId={factoryId} />
        </div>
        {/* 企业数字化 */}
        <div ref={domRef4}>
          <Digital factoryId={factoryId} />
        </div>
        {/* 车间设备 */}
        <div ref={domRef5}>
          <WorkshopEquipment factoryId={factoryId} />
        </div>
        {/* 资质证书 */}
        <div ref={domRef6}>
          <QualificationCertificate factoryId={factoryId} />
        </div>
        {/* 导航栏 */}
        <SlideBars barList={barList} domMap={domMap} activeKey={activeKey} />
      </div>
    </div>
  )
}

export default FactoryDetail

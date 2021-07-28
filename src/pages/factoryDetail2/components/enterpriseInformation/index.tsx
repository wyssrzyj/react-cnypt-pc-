import React, { useRef, useEffect, useState } from 'react'
import {
  PictureOutlined,
  AuditOutlined,
  ContainerOutlined,
  DashboardOutlined,
  FundProjectionScreenOutlined,
  SolutionOutlined
} from '@ant-design/icons'
import { isEmpty } from 'lodash'
import { SlideBars } from '@/components'
import CompaniesIntroduce from '../companiesIntroduce'
import EnterpriseImage from '../enterpriseImage'
import OrderInfo from '../orderInfo'
import WorkshopEquipment from '../workshopEquipment'
import Digital from '../digital'
import CommercialInfo from '../commercialInfo'
import QualificationCertificate from '../qualificationCertificate'

const barList = [
  { label: '企业照片', icon: <PictureOutlined /> },
  { label: '接单需求', icon: <ContainerOutlined /> },
  { label: '车间设备', icon: <AuditOutlined /> },
  { label: '数字化情况', icon: <DashboardOutlined /> },
  { label: '营业执照', icon: <FundProjectionScreenOutlined /> },
  { label: '资质证件', icon: <SolutionOutlined /> }
]

const EnterpriseInformation = props => {
  const { factoryId, current } = props
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

  useEffect(() => {
    window.addEventListener('scroll', setMove, true)

    return () => {
      window.removeEventListener('scroll', setMove)
    }
  }, [])

  return (
    <div style={{ marginTop: 30, padding: 40, backgroundColor: '#fff' }}>
      {/* 企业介绍 */}
      <CompaniesIntroduce factoryId={factoryId} current={current} />
      {/* 企业照片 */}
      {!isEmpty(current) && (
        <div ref={domRef1}>
          <EnterpriseImage ref={domRef1} current={current} />
        </div>
      )}
      {/* 接单需求 */}
      <div ref={domRef2}>
        <OrderInfo factoryId={factoryId} />
      </div>
      {/* 车间设备 */}
      <div ref={domRef3}>
        <WorkshopEquipment factoryId={factoryId} />
      </div>
      {/* 数字化情况 */}
      <div ref={domRef4}>
        <Digital factoryId={factoryId} />
      </div>
      {/* 营业执照 */}
      <div ref={domRef5}>
        <CommercialInfo factoryId={factoryId} />
      </div>
      {/* 资质证件 */}
      <div ref={domRef6}>
        <QualificationCertificate factoryId={factoryId} />
      </div>

      {/* 导航栏 */}
      <SlideBars barList={barList} domMap={domMap} activeKey={activeKey} />
    </div>
  )
}

export default EnterpriseInformation

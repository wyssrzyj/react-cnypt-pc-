import React, { useState, useEffect } from 'react'
import { Tabs, Table } from 'antd'
import classNames from 'classnames'
import { find, isNil, isArray } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { toJS } from 'mobx'
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper'

import Swiper from 'swiper'
import axios from '@/utils/axios'
import 'swiper/swiper-bundle.min.css'
import styles from './index.module.less'
import './style.less'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay])

const { TabPane } = Tabs

const tabList = [
  { value: '企业简介', key: 'introduction' },
  { value: '生产能力', key: 'ability' },
  { value: '合作条件', key: 'condition' },
  { value: '车间设备', key: 'equipment' },
  { value: '资质证书', key: 'certificate' }
]
const introductionMap = [
  { value: 'yearOutputValue', label: '年交易额' },
  { value: 'staffNumber', label: '员工总数' },
  { value: 'productLineNum', label: '生产流水线' },
  { value: 'factoryArea', label: '厂房面积' },
  { value: 'supportDesign', label: '支持打样' },
  { value: 'totalLocation', label: '加工设备' },
  { value: 'manufactureBrand', label: '代工品牌' },
  { value: 'factoryBrand', label: '商标/品牌' },
  { value: 'factoryCertificateLabels', label: '资质证书' }
]

const abilityMap = [
  { value: 'staffNumber', label: '生产人数' },
  { value: 'qcPersonNumber', label: '检验人数' },
  { value: 'yearOutputProd', label: '年产值' },
  { value: 'designPersonNumber', label: '打样人员数' },
  { value: 'qcGroupType', label: '检验小组' },
  { value: 'materialSupplyTime', label: '原材料供应时间' },
  { value: 'craft', label: '特殊工艺' }
]
const conditionMap = [
  { value: 'customMoq', label: '定制起订量' },
  { value: 'hasVatInvoice', label: '增值税发票' },
  { value: 'deliveryType', label: '交货方式' },
  { value: 'factoryInspectType', label: '验厂方式' },
  { value: 'oemMoq', label: '贴牌起订量' },
  { value: 'invoicePoint', label: '发票点数' },
  { value: 'payType', label: '付款方式' },
  { value: 'shortestDeliveryTime', label: '最短交货期' }
]

const TableComponent = props => {
  const { activeKey, current } = props
  const currentMap = activeKey === 'introduction' ? introductionMap : activeKey === 'ability' ? abilityMap : conditionMap
  return (
    <>
      {activeKey === 'introduction' && <div>{current.enterpriseDesc}</div>}
      <div className={styles.introduceInfo}>
        <ul className={classNames(styles.introduceBox, styles.introduceBoxLeft)}>
          {currentMap.map((item, index) => {
            const name = isNil(current[item.value]) ? undefined : item.label
            let newValue
            if (item.value === 'supportDesign' || item.value === 'hasVatInvoice') {
              newValue = current[item.value] ? '是' : '否'
            } else if (item.value === 'factoryCertificateLabels') {
              newValue = isArray(current[item.value]) ? current[item.value].join('、') : current[item.value]
            } else {
              newValue = current[item.value]
            }
            return (
              <li key={index}>
                <div className={styles.boxLabel}>{name}</div>
                <div className={styles.boxValue}>{newValue}</div>
              </li>
            )
          })}
        </ul>
        {/* <ul
          className={classNames(styles.introduceBox, styles.introduceBoxRight)}
        >
        </ul> */}
        {/* <ul
          className={classNames(styles.introduceBox, styles.introduceBoxBottom)}
        >
        </ul> */}
      </div>
    </>
  )
}
const WorkshopEquipment = props => {
  const {
    current: { equipment }
  } = props
  const rowKey = 'id'

  const columns = [
    {
      title: '设备名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '数量',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model'
    }
  ]
  useEffect(() => {
    new Swiper('.mySwiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      centeredSlides: true,
      centeredSlidesBounds: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      loop: true
    })
  }, [])
  return (
    <div>
      <Table rowKey={rowKey} dataSource={equipment} columns={columns} pagination={false} />
      <div className={styles.swiperBox}>
        <div className="swiper-container equipmentSwiper  mySwiper">
          <div className="swiper-wrapper">
            <div className={'swiper-slide'}>
              <img className="swiper-img" src={require('@/static/images/u1495.png')} />
            </div>
            <div className={'swiper-slide'}>
              <img className="swiper-img" src={require('@/static/images/u1496.png')} />
            </div>
            <div className={'swiper-slide'}>
              <img className="swiper-img" src={require('@/static/images/u1497.png')} />
            </div>
            <div className={'swiper-slide'}>
              <img className="swiper-img" src={require('@/static/images/u1497.png')} />
            </div>
          </div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    </div>
  )
}

const QualificationCertificate = props => {
  const {
    current: { certificate = [] }
  } = props
  return (
    <div className={styles.qualificationCertificate}>
      {certificate.map(item => (
        <div key={item.id} className={styles.certificateBox}>
          <img className={styles.certificateImg} src={require('@/static/images/u994.png')} />
          <span>{item.certificationName.label}</span>
        </div>
      ))}
    </div>
  )
}

const FactoryIntroduce = props => {
  const { factoryId } = props
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryYearOutputValue = [], factoryYearOutputProd = [], factoryCertificate = [] } = toJS(dictionary)
  console.log('🚀 ~ file: index.tsx ~ line 186 ~ toJS(dictionary)', toJS(dictionary))

  const [activeTab, setActiveTab] = useState('introduction')
  const [introductions, setIntroductions] = useState<any>({})
  const [ability, setAbility] = useState<any>({})
  const [conditions, setConditions] = useState<any>({})
  const [equipments, setEquipments] = useState<any>([])
  const [certificate, setCertificate] = useState<any>([])
  const [currentObj, setCurrentObj] = useState<any>({})

  const onTabChange = activeKey => {
    const newCurrent = {
      introduction: { ...introductions },
      ability: { ...ability },
      condition: { ...conditions },
      equipment: [...equipments],
      certificate: { ...certificate }
    }
    setActiveTab(activeKey)
    if (activeKey === 'equipment') {
      const equipment = { equipment: [...equipments] }
      setCurrentObj({ ...equipment })
    } else if (activeKey === 'certificate') {
      const newCertificate = { certificate: [...certificate] }
      setCurrentObj({ ...newCertificate })
    } else {
      setCurrentObj({ ...newCurrent[activeKey] })
    }
  }

  // 企业简介
  const getIntroduction = async () => {
    const response = await axios.get('/api/factory/enterprise/get-by-factory-id', {
      factoryId
    })
    const { success, data = {} } = response
    if (success) {
      const { yearOutputValue, staffNumber, factoryArea, productLineNum, totalLocation } = data
      const newValue = factoryYearOutputValue.find(item => item.value === yearOutputValue) || {}
      const newNumber = staffNumber.split(',')
      setIntroductions({
        ...data,
        yearOutputValue: newValue.label,
        staffNumber: `${newNumber[0]}人 ~ ${newNumber[1]}人`,
        factoryArea: `${factoryArea}平米`,
        productLineNum: `${productLineNum}条`,
        totalLocation: `${totalLocation}台`
      })
      setCurrentObj({
        ...data,
        yearOutputValue: newValue.label,
        staffNumber: `${newNumber[0]}人 ~ ${newNumber[1]}人`,
        factoryArea: `${factoryArea}平米`,
        productLineNum: `${productLineNum}条`,
        totalLocation: `${totalLocation}台`
      })
    }
  }
  //生产能力
  const getAbility = async () => {
    const response = await axios.get('/api/factory/info/get-capacity-factory-id', {
      factoryId
    })
    const { success, data = {} } = response
    if (success) {
      const { staffNumber, qcPersonNumber, yearOutputProd, designPersonNumber, materialSupplyTime } = data
      const newNumber = staffNumber.split(',')
      const newValue = factoryYearOutputProd.find(item => item.value === yearOutputProd) || {}
      setAbility({
        ...data,
        staffNumber: `${newNumber[0]}人 ~ ${newNumber[1]}人`,
        qcPersonNumber: `${qcPersonNumber}人`,
        yearOutputProd: newValue.label,
        designPersonNumber: `${designPersonNumber}人`,
        materialSupplyTime: `${materialSupplyTime}天`
      })
    }
  }

  // 合作条件
  const getCooperation = async () => {
    const response = await axios.get('/api/factory/cooperation-condition/get', {
      id: '1398111476140589058'
    })
    const { success, data = {} } = response
    if (success) {
      const { customMoq, oemMoq, invoicePoint, shortestDeliveryTime } = data
      setConditions({
        ...data,
        customMoq: `${customMoq}件`,
        oemMoq: `${oemMoq}件`,
        invoicePoint: `${invoicePoint}%`,
        shortestDeliveryTime: `${shortestDeliveryTime}天`
      })
    }
  }
  // 车间设备
  const getEquipment = async () => {
    const response = await axios.post('/api/factory/equipment/list', {
      factoryId
    })
    const { success, data = {} } = response
    if (success) {
      const { records } = data
      setEquipments([...records])
    }
  }
  // 资质证书
  const getCertificate = async () => {
    const response = await axios.post('/api/factory/factory-certificate/list', {
      factoryId
    })
    const { success, data = {} } = response
    if (success) {
      const { records = [] } = data
      const newData = records.map(item => ({
        ...item,
        certificationName: factoryCertificate.find(o => o.value === item.certificationName) || {}
      }))
      setCertificate([...newData])
    }
  }

  useEffect(() => {
    if (dictionary) {
      getIntroduction()
      getCooperation()
      getAbility()
      getEquipment()
      getCertificate()
    }
  }, [dictionary])
  return (
    <div className={styles.factoryIntroduce}>
      <Tabs activeKey={activeTab} tabBarGutter={20} onChange={onTabChange}>
        {tabList.map(item => (
          <TabPane tab={item.value} key={item.key}>
            <div className={styles.introduceContent}>
              <h2 className={styles.introduceTitle}>{find(tabList, tab => tab.key === activeTab).value}</h2>
              {/* 企业简介 生产能力 合作条件 */}
              {(activeTab === 'introduction' || activeTab === 'ability' || activeTab === 'condition') && (
                <TableComponent activeKey={activeTab} current={currentObj} />
              )}
              {/* 车间设备 */}
              {activeTab === 'equipment' && <WorkshopEquipment current={currentObj} />}
              {/* 资质证书 */}
              {activeTab === 'certificate' && <QualificationCertificate current={currentObj} />}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default observer(FactoryIntroduce)

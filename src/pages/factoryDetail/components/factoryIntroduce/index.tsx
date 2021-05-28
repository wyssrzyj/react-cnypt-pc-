import React, { useState, useEffect } from 'react'
import { Tabs, Table } from 'antd'
import classNames from 'classnames'
import { find } from 'lodash'
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay
} from 'swiper'

import Swiper from 'swiper'
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
const TableComponent = props => {
  const { activeKey } = props
  return (
    <>
      {activeKey === 'introduction' && (
        <div>
          我们是在广州白云区的女装源头生产厂家，专业做中高端女装产品的，现货，贴牌生产，有设计，打样，车间，后整，成品仓一系列服务。主要生产中高端女装连衣裙，时尚套装，半身裙的一个源头工厂。
        </div>
      )}
      <div className={styles.introduceInfo}>
        <ul
          className={classNames(styles.introduceBox, styles.introduceBoxLeft)}
        >
          <li>
            <div className={styles.boxLabel}>年交易额</div>
            <div className={styles.boxValue}>1000万~2000万</div>
          </li>
          <li>
            <div className={styles.boxLabel}>员工总数</div>
            <div className={styles.boxValue}>101人~200人</div>
          </li>
          <li>
            <div className={styles.boxLabel}>生产流水线</div>
            <div className={styles.boxValue}>2条</div>
          </li>
        </ul>
        <ul
          className={classNames(styles.introduceBox, styles.introduceBoxRight)}
        >
          <li>
            <div className={styles.boxLabel}>厂房面积</div>
            <div className={styles.boxValue}>1000平米</div>
          </li>
          <li>
            <div className={styles.boxLabel}>支持打样</div>
            <div className={styles.boxValue}>是</div>
          </li>
          <li>
            <div className={styles.boxLabel}>加工设备</div>
            <div className={styles.boxValue}>150台</div>
          </li>
        </ul>
        <ul
          className={classNames(styles.introduceBox, styles.introduceBoxBottom)}
        >
          <li>
            <div className={styles.boxLabelBottom}>代工品牌(1)</div>
            <div className={styles.boxValueBottom}>TAM*S糖力</div>
          </li>
          <li>
            <div className={styles.boxLabelBottom}>商标/品牌(1)</div>
            <div className={styles.boxValueBottom}>AISHANG MEYZIS</div>
          </li>
          <li>
            <div className={styles.boxLabelBottom}>资质证书(1)</div>
            <div className={styles.boxValueBottom}>质检报告</div>
          </li>
        </ul>
      </div>
    </>
  )
}
const WorkshopEquipment = () => {
  const rowKey = 'key'
  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      number: 32,
      brand: '西湖区湖底公园1号',
      model: 'XC-3020G'
    },
    {
      key: '2',
      name: '胡彦斌',
      number: 32,
      brand: '西湖区湖底公园1号',
      model: 'XC-3020G'
    }
  ]

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
      // autoplay: {
      //   delay: 2000,
      //   disableOnInteraction: true,
      // },
    })
  }, [])
  return (
    <div>
      <Table
        rowKey={rowKey}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
      />
      <div className={styles.swiperBox}>
        <div className="swiper-container equipmentSwiper  mySwiper">
          <div className="swiper-wrapper">
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1495.png')}
              />
            </div>
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1496.png')}
              />
            </div>
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1497.png')}
              />
            </div>
            <div className={'swiper-slide'}>
              <img
                className="swiper-img"
                src={require('@/static/images/u1497.png')}
              />
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

const QualificationCertificate = () => {
  return (
    <div className={styles.qualificationCertificate}>
      <div className={styles.certificateBox}>
        <img
          className={styles.certificateImg}
          src={require('@/static/images/u994.png')}
        />
        <span>生产资质</span>
      </div>
    </div>
  )
}

const FactoryIntroduce = () => {
  const [activeTab, setActiveTab] = useState('introduction')
  const onTabChange = activeKey => {
    setActiveTab(activeKey)
  }
  return (
    <div className={styles.factoryIntroduce}>
      <Tabs activeKey={activeTab} tabBarGutter={20} onChange={onTabChange}>
        {tabList.map(item => (
          <TabPane tab={item.value} key={item.key}>
            <div className={styles.introduceContent}>
              <h2 className={styles.introduceTitle}>
                {find(tabList, tab => tab.key === activeTab).value}
              </h2>
              {/* 企业简介 生产能力 合作条件 */}
              {(activeTab === 'introduction' ||
                activeTab === 'ability' ||
                activeTab === 'condition') && (
                <TableComponent activeKey={activeTab} />
              )}
              {/* 车间设备 */}
              {activeTab === 'equipment' && <WorkshopEquipment />}
              {/* 资质证书 */}
              {activeTab === 'certificate' && <QualificationCertificate />}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default FactoryIntroduce

import React from 'react'
import { Tabs } from 'antd'
import styles from './index.module.less'

const { TabPane } = Tabs

const tabList = ['企业简介', '生产能力', '合作条件', '车间设备', '资质证书']

function FactoryIntroduce() {
  return (
    <div className={styles.factoryIntroduce}>
      <Tabs defaultActiveKey="1" tabBarGutter={20}>
        {tabList.map((item, index) => (
          <TabPane tab={item} key={index}>
            <div className={styles.introduceContent}>
              <h2 className={styles.introduceTitle}>企业简介</h2>
              <div>
                我们是在广州白云区的女装源头生产厂家，专业做中高端女装产品的，现货，贴牌生产，有设计，打样，车间，后整，成品仓一系列服务。主要生产中高端女装连衣裙，时尚套装，半身裙的一个源头工厂。
              </div>
              <div className={styles.introduceInfo}>
                <ul className={styles.introduceBox}>
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
                <ul className={styles.introduceBox}>
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
                <ul className={styles.introduceBox}>
                  <li>
                    <div className={styles.boxLabel}>代工品牌(1)</div>
                    <div className={styles.boxValue}>TAM*S糖力</div>
                  </li>
                  <li>
                    <div className={styles.boxLabel}>商标/品牌(1)</div>
                    <div className={styles.boxValue}>AISHANG MEYZIS</div>
                  </li>
                  <li>
                    <div className={styles.boxLabel}>资质证书(1)</div>
                    <div className={styles.boxValue}>质检报告</div>
                  </li>
                </ul>
              </div>
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default FactoryIntroduce

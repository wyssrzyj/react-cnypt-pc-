import React from 'react'
import { Tabs } from 'antd'
import styles from './index.module.less'

const { TabPane } = Tabs

const TabPaneList = ['全部', '半身裙', 'T恤', '女士夹克']

const goodsList = [1, 1, 1, 1, 1, 1, 1, 1, , 1, 1, 1, 1, 1, 1]

function SamplesShow() {
  return (
    <div className={styles.samplesShow}>
      <h2>样品展示</h2>
      <Tabs defaultActiveKey="1">
        {TabPaneList.map((item, index) => (
          <TabPane tab={item} key={index}>
            <div className={styles.samplesContent}>
              {goodsList.map((item, index) => (
                <div key={index} className={styles.samplesCard}>
                  <img
                    className={styles.goodsImg}
                    src={require('@/static/images/u912.png')}
                    alt=""
                  />
                  <span>{item}瓦俪娅 2021年春...</span>
                </div>
              ))}
            </div>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default SamplesShow

import React, { useState } from 'react'
import { Button, Tabs } from 'antd'
import styles from './todo.module.less'
import { PlusCircleTwoTone } from '_@ant-design_icons@4.6.4@@ant-design/icons'
import Product from './components/allorders/product'
import FormModular from './components/formModular/index'
import TopList from './components/topList/index'
// 配置路由

const Issueabill = () => {
  const [keyt, setKeyt] = useState('1')
  const [completed, setCompleted] = useState('1')
  const data = { keyt, completed }
  const { TabPane } = Tabs
  const operations = (
    <Button className={styles.newly} icon={<PlusCircleTwoTone />}>
      新增按钮
    </Button>
  )
  // 判断按钮显示是否是在草稿箱
  const OrderList = [
    { name: '全部订单', value: '1' },
    { name: '待确认', value: '2' },
    { name: '进行中', value: '3' },
    { name: '待验收', value: '4' },
    { name: '已完成', value: '5' },
    { name: '退回', value: '6' },
    { name: '取消', value: '7' },
    { name: '草稿箱', value: '8' }
  ]
  const onChange = activeKey => {
    setCompleted(activeKey) //已完成
    setKeyt(activeKey) //草稿箱
  }

  return (
    <div className={styles.Issuebill}>
      <div className={styles.tutu}>
        <Tabs
          tabPosition="top"
          tabBarGutter={80}
          tabBarExtraContent={operations}
          onChange={onChange}
          activeKey={keyt}
        >
          {OrderList.map(item => {
            return <TabPane tab={item.name} key={item.value} />
          })}
        </Tabs>
      </div>
      <FormModular />
      <TopList data={data} />
      {/* 全部订单 */}

      <Product keyt={keyt} data={data} />
    </div>
  )
}
export default Issueabill

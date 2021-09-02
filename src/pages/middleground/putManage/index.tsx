import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Tabs, Button } from 'antd'
import { useHistory, useLocation } from 'react-router'
import { Icon } from '@/components'

const { TabPane } = Tabs

type OptionType = {
  label: string
  key: number | string
  url?: string
}

const tabs: Array<OptionType> = [
  { label: '全部订单', url: '', key: 'all' },
  { label: '待确认', url: '', key: 'confirm' },
  { label: '进行中', url: '', key: 'doing' },
  { label: '待验收', url: '', key: 'checked' },
  { label: '已完成', url: '', key: 'complete' },
  { label: '退回', url: '', key: 'return' },
  { label: '取消', url: '', key: 'cancel' },
  { label: '草稿箱', url: '', key: 'draft' }
]

const AddIcon = <Icon type={'jack-add1'} className={styles.addIcon}></Icon>

const PutManage = () => {
  // TODO:解析url路由参数 获取key值
  const location = useLocation()
  console.log('🚀 ~ file: index.tsx ~ line 28 ~ PutManage ~ location', location)
  const history = useHistory()
  console.log('🚀 ~ file: index.tsx ~ line 30 ~ PutManage ~ history', history)

  const [activeKey, setActiveKey] = useState('all')

  const tabChange = key => {
    setActiveKey(key)
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <Tabs size={'large'} activeKey={activeKey} onChange={tabChange}>
          {tabs.map((item: OptionType) => (
            <TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>

        <Button icon={AddIcon} className={styles.addOrderBtn}>
          新增订单
        </Button>
      </div>
    </div>
  )
}

export default PutManage

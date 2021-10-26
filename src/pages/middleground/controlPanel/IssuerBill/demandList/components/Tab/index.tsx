import React, { useState, useEffect } from 'react'
import { Button, Tabs } from 'antd'
import styles from './index.module.less'
import { Link } from 'react-router-dom'
import { PlusCircleTwoTone } from '@ant-design/icons'
import { useHistory, useLocation } from 'react-router'

const { TabPane } = Tabs

const Tab = ({ routing }) => {
  const tabs = [
    { label: `全部`, url: '', key: '', labelChange: '' },
    { label: `生效中 `, url: '', key: 1, labelChange: '' },
    { label: `已结束`, url: '', key: -3, labelChange: '' },
    { label: `审核失败`, url: '', key: -2, labelChange: '' },
    { label: `草稿`, url: '', key: -1, labelChange: '' }
  ]

  const history = useHistory()
  const location = useLocation()
  const { search } = location
  const [activeKey, setActiveKey] = useState<string>('')
  const searchURL = new URLSearchParams(search)
  const initialKey = searchURL.get('key')

  useEffect(() => {
    if (initialKey) {
      setActiveKey(initialKey)
    }
  }, [])

  function callback(key) {
    routing(key)
    setActiveKey(key)
    history.replace(`${location.pathname}?key=${key}`)
  }

  return (
    <div className={styles.table}>
      <Tabs size={'large'} activeKey={activeKey} onChange={callback}>
        {tabs.map(item => (
          <TabPane
            className={styles.taipans}
            tab={`${item.label}`}
            key={item.key}
          ></TabPane>
        ))}
      </Tabs>

      <div className={styles.added}>
        <Button className={styles.newly} icon={<PlusCircleTwoTone />}>
          <Link to={'/control-panel/panel/demand-sheet'}> 新增订单</Link>
        </Button>
      </div>
    </div>
  )
}

export default Tab

import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import styles from './index.module.less'
import { useHistory, useLocation } from 'react-router'

const { TabPane } = Tabs

const tabs = [
  { label: `全部`, url: '', key: '' },
  { label: `待处理`, url: '', key: '2' },
  { label: `等待答复`, url: '', key: '1' },
  { label: `已确认`, url: '', key: '3' },
  { label: `已谢绝`, url: '', key: '-2' },
  { label: `被拒绝`, url: '', key: '-1' }
]

const Tab = ({ routing }) => {
  const history = useHistory()
  const location = useLocation()
  const { search } = location
  const [activeKey, setActiveKey] = useState<string>('')
  useEffect(() => {
    const searchURL = new URLSearchParams(search)
    const initialKey = searchURL.get('key')
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
          <TabPane tab={item.label} key={item.key}></TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default Tab

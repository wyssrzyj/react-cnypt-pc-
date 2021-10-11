import React, { useState, useEffect } from 'react'
import { Tabs } from 'antd'
import styles from './index.module.less'
import { useHistory, useLocation } from 'react-router'

const { TabPane } = Tabs

type OptionType = {
  label: string
  key: number | string
  url?: string
}
const tabs: Array<OptionType> = [
  { label: `全部`, url: '', key: 'whole' },
  { label: `生效中`, url: '', key: 'effect' },
  { label: `已反馈`, url: '', key: 'already' },
  { label: `待验收`, url: '', key: 'accepted' },
  { label: `已结束`, url: '', key: 'ended' },
  { label: `审核失败`, url: '', key: 'failed' },
  { label: `草稿`, url: '', key: 'draft' }
]

function Tab() {
  const history = useHistory()
  const location = useLocation()
  const { pathname, search } = location
  const [activeKey, setActiveKey] = useState<string>('all')
  useEffect(() => {
    const searchURL = new URLSearchParams(search)
    const initialKey = searchURL.get('key')
    setActiveKey(initialKey)
  }, [])

  function callback(key) {
    setActiveKey(key)
    console.log(pathname)
    history.replace(`${location.pathname}?key=${key}`)
  }

  return (
    <div>
      <Tabs size={'large'} activeKey={activeKey} onChange={callback}>
        {tabs.map(item => (
          <TabPane
            className={styles.taipans}
            tab={item.label}
            key={item.key}
          ></TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default Tab

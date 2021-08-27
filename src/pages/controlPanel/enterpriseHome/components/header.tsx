import { Icon } from '@/components'
import React, { useState } from 'react'
import styles from './header.module.less'
import { Select } from 'antd'

const { Option } = Select

const IconAndInfo = ({ data }) => {
  return (
    <div className={styles.iconAndInfo}>
      <div className={styles.iconAndInfoLabel}>
        <Icon type={data.icon} className={styles.iconAndInfoIcon}></Icon>
        {data.label}
      </div>
      <div className={styles.iconAndInfoCount}>{data.count}</div>
    </div>
  )
}

const Header = ({ rightConfigs }) => {
  const daysOptions = [
    { label: '今日', value: 1 },
    { label: '本周', value: 2 },
    { label: '本月', value: 3 }
  ]

  const [dayValue, setDayValue] = useState(1)

  const dayChange = value => {
    setDayValue(value)
  }

  return (
    <header className={styles.header}>
      {/* 左侧 */}
      <div className={styles.headerLeft}>
        {/* 头像 */}
        <img src="" alt="" className={styles.avatar} />
        {/* 信息 */}
        <div className={styles.userInfo}>
          <div className={styles.name}>早安,李玉华</div>
          <div className={styles.companyInfo}>
            <div className={styles.companyInfoL}>
              <Icon type={'jack-qymc'} className={styles.headerIcon}></Icon>
              <span>杭州嘉庆服饰有限公司</span>
            </div>
            <div className={styles.companyInfoR}>
              <Icon
                type={'jack-guanliyuan'}
                className={styles.headerIcon}
              ></Icon>
              <span>管理员</span>
            </div>
          </div>
          <div className={styles.dayInfo}>已入驻平台 365 天</div>
        </div>
      </div>
      {/* 右侧 */}
      <div className={styles.headerRight}>
        <Select onChange={dayChange} value={dayValue}>
          {daysOptions.map(item => (
            <Option value={item.value} key={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>

        <div className={styles.headerRightBtm}>
          {rightConfigs.map((item, idx) => {
            return <IconAndInfo data={item} key={idx}></IconAndInfo>
          })}
        </div>
      </div>
    </header>
  )
}

export default Header

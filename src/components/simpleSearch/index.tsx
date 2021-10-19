import React from 'react'
import { Input } from 'antd'
import styles from './index.module.less'

const { Search } = Input

const SimpleSearch = () => {
  const onSearch = value => console.log(value)
  return (
    <div className={styles.simpleSearch}>
      <div className={styles.content}>
        <img src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/uchartLogo.png" />
        <Search
          style={{ width: 500 }}
          placeholder="请输入发单信息"
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  )
}

export default SimpleSearch

import React from 'react'
import { useLocation } from 'react-router'
import { Input } from 'antd'
import styles from './index.module.less'

const { Search } = Input

const DetailHeader = () => {
  const location = useLocation()
  const onSearch = () => {}
  return (
    <div className={styles.detailHeader}>
      <img
        className={styles.logo}
        src={require('../../static/images/jack-logo.png')}
      />
      <Search
        className={styles.detailSearch}
        placeholder={`请输入${
          location.pathname === '/factory-detail' ? '工厂' : '订单'
        }信息`}
        allowClear
        enterButton="搜索"
        size="large"
        onSearch={onSearch}
      />
    </div>
  )
}

export default DetailHeader

import React from 'react'
import { Input } from 'antd'
// import { AudioOutlined } from '@ant-design/icons';
import styles from './index.module.less'

const { Search } = Input

const DetailHeader = () => {
  const onSearch = () => {}
  return (
    <div className={styles.detailHeader}>
      <img
        className={styles.logo}
        src={require('../../static/images/jack-logo.png')}
      />
      <Search
        className={styles.detailSearch}
        placeholder="请输入订单信息"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
      />
    </div>
  )
}

export default DetailHeader

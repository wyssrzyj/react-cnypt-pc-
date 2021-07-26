import React from 'react'
import { useLocation } from 'react-router'
import { Input } from 'antd'
import styles from './index.module.less'

const { Search } = Input

const DetailHeader = props => {
  const { search } = props
  const location = useLocation()
  const onSearch = value => {
    search(value)
  }
  return (
    <div className={styles.detailHeader}>
      <div className={styles.content}>
        <img
          className={styles.logo}
          src="http://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/20210722/5a113adbb7a24ecc8ebedef760019f84.png"
          alt="优产云平台"
        />
        <Search
          className={styles.detailSearch}
          placeholder={`请输入${
            new RegExp('factory').test(location.pathname) ? '工厂' : '订单'
          }名称`}
          allowClear
          enterButton="搜索"
          size="large"
          onSearch={onSearch}
        />
      </div>
    </div>
  )
}

export default DetailHeader

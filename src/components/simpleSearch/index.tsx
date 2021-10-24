import React from 'react'
import { Input, Divider } from 'antd'
import { isEmpty } from 'lodash'
import styles from './index.module.less'

const { Search } = Input

const SimpleSearch = props => {
  const { config } = props
  const onSearch = value => console.log(value)
  return (
    <div className={styles.simpleSearch}>
      <div className={styles.content}>
        <div>
          <img src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/uchartLogo.png" />
          {!isEmpty(config) && (
            <>
              <Divider className={styles.verticalLine} type="vertical" />
              <img className={styles.image} src={config.imgSrc} />
              <span className={styles.title}>{config.title}</span>
            </>
          )}
        </div>
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

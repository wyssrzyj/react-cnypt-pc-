import React, { useState } from 'react'
import { Input, Divider } from 'antd'
import { isEmpty } from 'lodash'
import { useStores } from '@/utils/mobx'
import styles from './index.module.less'

const { Search } = Input

const SimpleSearch = props => {
  const { config, onFilterChange, field = 'name' } = props

  const { searchOrderStore } = useStores()
  const { updateOrderName, orderName } = searchOrderStore

  const [searchWord, setSearchWord] = useState<string>(orderName)

  const onSearch = value => {
    updateOrderName(value)
    onFilterChange({
      [field]: value
    })
  }
  return (
    <div className={styles.simpleSearch}>
      <div className={styles.content}>
        <div>
          <img src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/uchartLogo.png" />
          {!isEmpty(config) && (
            <>
              <Divider className={styles.verticalLine} type="vertical" />
              {config.imgSrc && (
                <img className={styles.image} src={config.imgSrc} />
              )}
              <span className={styles.title}>{config.title}</span>
            </>
          )}
        </div>
        <Search
          style={{ width: 500 }}
          placeholder="请输入订单信息"
          allowClear
          enterButton="搜索"
          size="large"
          value={searchWord}
          onChange={e => setSearchWord(e.target.value)}
          onSearch={onSearch}
        />
      </div>
    </div>
  )
}

export default SimpleSearch

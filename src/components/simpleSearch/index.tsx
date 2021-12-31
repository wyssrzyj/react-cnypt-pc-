import React, { useState } from 'react'
import { Input, Divider } from 'antd'
import { isEmpty, get } from 'lodash'
import { useStores } from '@/utils/mobx'
import styles from './index.module.less'
import { useHistory } from 'react-router-dom'
const { Search } = Input

const titleMap = { order: '订单', factoryName: '工厂' }

const SimpleSearch = props => {
  const history = useHistory()

  const { config = {}, onFilterChange, field = 'name' } = props

  const currentImg =
    config.imgSrc ||
    'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/rc-upload-1635389590602-4logo_moren%402x.png'

  const { searchOrderStore } = useStores()
  const { updateOrderName, orderName } = searchOrderStore

  const [searchWord, setSearchWord] = useState<string>(orderName)

  const onSearch = value => {
    updateOrderName(value)
    onFilterChange({
      [field]: value
    })
  }
  const btn = () => {
    history.push({
      pathname: '/issuerHomePage',
      state: {
        id: config.tenantId
      }
    })
  }
  return (
    <div className={styles.simpleSearch}>
      <div className={styles.content}>
        <div className={styles.tops}>
          <img src="https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/uchartLogo.png" />
          {!isEmpty(config) && (
            <div className={styles.top} onClick={btn}>
              <Divider className={styles.verticalLine} type="vertical" />
              <img className={styles.image} src={currentImg} />
              <span className={styles.title}>{config.title}</span>
            </div>
          )}
        </div>
        <Search
          style={{ width: 500 }}
          placeholder={`请输入${get(titleMap, field, '工厂')}信息`}
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

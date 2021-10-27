import React, { useState } from 'react'
import classNames from 'classnames'
import { Icon } from '@/components'
import { cloneDeep } from 'lodash'
import styles from './index.module.less'

interface Config {
  label: string
  sort: number
  field: string
}

const headerConfigs: Array<Partial<Config>> = [
  {
    label: '最新发布',
    field: 'newPublish',
    sort: -1
  },
  {
    label: '有效日期',
    sort: -1,
    field: 'effectiveDate'
  }
]

const SORT_TYPE = new Map()
SORT_TYPE.set(-1, null)
SORT_TYPE.set(0, 'asc')
SORT_TYPE.set(1, 'desc')

const SORT_ICON_MAP = new Map()
SORT_ICON_MAP.set(-1, 'jack-shengjiangxu-morenzhuangtai')
SORT_ICON_MAP.set(0, 'jack-shengjiangxu-shengxu')
SORT_ICON_MAP.set(1, 'jack-shengjiangxu-jiangxu')

const OrderSearchHeader = () => {
  const [configs, setConfigs] = useState<Array<Partial<Config>>>(headerConfigs)

  const changeSort = index => {
    const newConfigs = cloneDeep(configs)
    const target = newConfigs[index]
    target.sort = target.sort > 0 ? -1 : target.sort === 0 ? 1 : 0
    setConfigs(newConfigs)
  }

  return (
    <div className={styles.orderSearchHeader}>
      <div>
        <span className={styles.sortItem}>排序方式</span>
        {configs.map((item, index) => (
          <span
            className={classNames(
              styles.sortItem,
              item.sort !== -1 && styles.active
            )}
          >
            {item.label}
            <Icon
              onClick={() => changeSort(index)}
              type={SORT_ICON_MAP.get(item.sort)}
              className={styles.listHeaderSortIcon}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default OrderSearchHeader

import React, { useState } from 'react'
import classNames from 'classnames'
import { Icon } from '@/components'
import { cloneDeep } from 'lodash'
import styles from './index.module.less'

interface Config {
  label: string
  value: string
  sort: number
}

const headerConfigs: Array<Partial<Config>> = [
  {
    label: '最新发布',
    value: 'releaseTime',
    sort: -1
  },
  {
    label: '有效日期',
    value: 'inquiryEffectiveDate',
    sort: -1
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

const OrderSearchHeader = props => {
  const { onChange } = props
  const [configs, setConfigs] = useState<Array<Partial<Config>>>(headerConfigs)

  const changeSort = index => {
    const newConfigs = cloneDeep(configs)
    const target = newConfigs[index]

    target.sort = target.sort > 0 ? -1 : target.sort === 0 ? 1 : 0
    const currentConfig = newConfigs.map((config, idx) => {
      if (idx === index) {
        return { ...config }
      } else {
        return { ...config, sort: -1 }
      }
    })
    setConfigs(currentConfig)
    onChange({
      sortField: target.value,
      sortType: SORT_TYPE.get(target.sort)
    })
  }

  return (
    <div className={styles.orderSearchHeader}>
      <div>
        <span className={styles.sortItem}>排序方式</span>
        {configs.map((item, index) => (
          <span
            key={index}
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

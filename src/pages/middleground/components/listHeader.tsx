import React, { useEffect, useState } from 'react'
import styles from './listHeader.module.less'
import { Icon } from '@/components'
import { cloneDeep } from 'lodash'

export interface Params {
  sortType?: string
  sortField?: string
  pageNum?: number
  pageSize?: number
  name?: string
  keyword?: string
  minAmount?: string
  maxAmount?: string
  startTime?: any
  endTime?: any
}

interface Config {
  label: string
  sort: number
  field: string
  width: number
}

const SORT_ICON_MAP = new Map()
SORT_ICON_MAP.set(-1, 'jack-shengjiangxu-morenzhuangtai')
SORT_ICON_MAP.set(0, 'jack-shengjiangxu-shengxu')
SORT_ICON_MAP.set(1, 'jack-shengjiangxu-jiangxu')

const SORT_TYPE = new Map()
SORT_TYPE.set(-1, null)
SORT_TYPE.set(0, 'asc')
SORT_TYPE.set(1, 'desc')

const headerConfigs: Array<Partial<Config>> = [
  {
    label: '订单详情',
    width: 360
  },
  {
    label: '数量',
    sort: -1,
    field: 'total_amount',
    width: 200
  },
  {
    label: '总金额(元)',
    sort: -1,
    field: 'total_price',
    width: 200
  },
  {
    label: '订单状态',
    sort: -1,
    field: 'status',
    width: 200
  },
  {
    label: '操作'
  }
]

const ListHeader = ({ callback, curKey, type }) => {
  const [configs, setConfigs] = useState<Array<Partial<Config>>>(headerConfigs)

  useEffect(() => {
    const newConfigs = cloneDeep(configs)

    newConfigs[3] = {
      label: '订单状态',
      sort: -1,
      field: 'status',
      width: 200
    }

    if (curKey === 'complete') {
      newConfigs[3] = {
        label: '订单完成时间',
        field: 'completeTime',
        width: 200
      }
    }
    if (curKey === 'draft') {
      newConfigs[3] = {
        label: '操作时间',
        field: 'editTime',
        width: 200
      }
    }
    if (curKey === 'return' && type === 'receive') {
      newConfigs[3] = {
        label: '退回订单时间',
        field: 'returnTime',
        width: 200
      }
    }

    setConfigs(newConfigs)
  }, [curKey])

  const changeSort = index => {
    const newConfigs = cloneDeep(configs)
    newConfigs.forEach((item, idx) => {
      if (idx !== index && typeof item.sort === 'number') {
        item.sort = -1
      }
    })
    const target = newConfigs[index]
    target.sort = target.sort > 0 ? -1 : target.sort === 0 ? 1 : 0
    setConfigs(newConfigs)

    const params = {
      pageNum: 1,
      sortField: target.field,
      sortType: SORT_TYPE.get(target.sort)
    }

    callback && callback(params)
  }

  return (
    <div className={styles.listHeader}>
      {configs.map((item, idx) => {
        return (
          <div
            key={idx}
            className={styles.listHeaderItem}
            style={{
              width: item.width,
              flex: idx === configs.length - 1 ? 1 : null
            }}
          >
            {item.label}
            {typeof item.sort === 'number' ? (
              <Icon
                onClick={() => changeSort(idx)}
                type={SORT_ICON_MAP.get(item.sort)}
                className={styles.listHeaderSortIcon}
              ></Icon>
            ) : null}
          </div>
        )
      })}
    </div>
  )
}

export default ListHeader

import React, { useState } from 'react'
import styles from './index.module.less'
import { Icon } from '@/components'
import { cloneDeep } from 'lodash'
import { Row, Col } from 'antd'

interface Config {
  label: string
  sort: number
  field: string
  width: number
  marginLift: number
  span: number
}
const SORT_ICON_MAP = new Map()
SORT_ICON_MAP.set(-1, 'jack-shengjiangxu-morenzhuangtai')
SORT_ICON_MAP.set(0, 'jack-shengjiangxu-shengxu')
SORT_ICON_MAP.set(1, 'jack-shengjiangxu-jiangxu')
const state = new Map()
state.set(-1, null)
state.set(0, 'desc')
state.set(1, 'asc')

const headerConfigs: Array<Partial<Config>> = [
  {
    span: 4
  },
  {
    label: '订单信息',
    span: 8
  },
  {
    label: '反馈情况',
    span: 6
  },
  {
    label: '状态',
    sort: -1,
    span: 4,
    field: 'status'
  },
  {
    label: '操作',
    span: 1
  }
]

function Sort({ callback }) {
  const [configs, setConfigs] = useState<Array<Partial<Config>>>(headerConfigs)

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
      sortType: state.get(target.sort)
    }

    callback && callback(params)
  }

  return (
    <div className={styles.store}>
      <Row>
        {configs.map((item, idx) => {
          return (
            <Col key={idx} span={item.span}>
              <div
                key={idx}
                className={styles.listHeaderItem}
                style={{
                  width: item.width,
                  marginLeft: item.marginLift,
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
            </Col>
          )
        })}
      </Row>
    </div>
  )
}

export default Sort

import React, { useState, useEffect } from 'react'
import MapTemp from './areaComponent'
import styles from './areaSearch.module.less'
import classNames from 'classnames'
import Icon from '@/components/Icon'
import { Button } from 'antd'

type AreaItem = {
  area: string
  count: number
  icon?: string
  color?: string
  code?: string
  children?: Array<AreaItem>
}

const initAreaList: Array<AreaItem> = [
  {
    area: '上海市',
    code: '',
    count: 1124,
    color: '#EC808D',
    icon: 'jack-shanghai',
    children: [
      {
        area: '上海市',
        code: '',
        count: 1124,
      },
    ],
  },
  {
    area: '浙江省',
    code: '',
    count: 924,
    color: '#70B603',
    icon: 'jack-zhejiang',
    children: [
      {
        area: '舟山市',
        code: '',
        count: 112,
      },
      {
        area: '杭州市',
        code: '',
        count: 112,
      },
      {
        area: '嘉兴市',
        code: '',
        count: 112,
      },
      {
        area: '衢州市',
        code: '',
        count: 112,
      },
      {
        area: '宁波市',
        code: '',
        count: 112,
      },
      {
        area: '绍兴市',
        code: '',
        count: 112,
      },
      {
        area: '湖州市',
        code: '',
        count: 112,
      },
      {
        area: '台州市',
        code: '',
        count: 112,
      },
    ],
  },
  {
    area: '江苏省',
    code: '',
    count: 924,
    color: '#FACD91',
    icon: 'jack-jiangsu',
    children: [
      {
        area: '南京市',
        code: '',
        count: 112,
      },
      {
        area: '无锡市',
        code: '',
        count: 112,
      },
      {
        area: '徐州市',
        code: '',
        count: 112,
      },
      {
        area: '常州市',
        code: '',
        count: 112,
      },
      {
        area: '苏州市',
        code: '',
        count: 112,
      },
      {
        area: '南通市',
        code: '',
        count: 112,
      },
      {
        area: '淮安市',
        code: '',
        count: 112,
      },
      {
        area: '镇江市',
        code: '',
        count: 112,
      },
      {
        area: '镇江市',
        code: '',
        count: 112,
      },
    ],
  },
  {
    area: '浙江省',
    code: '',
    count: 924,
    color: '#F59A23',
    icon: 'jack-anhui',
    children: [
      {
        area: '舟山市',
        code: '',
        count: 112,
      },
      {
        area: '杭州市',
        code: '',
        count: 112,
      },
      {
        area: '嘉兴市',
        code: '',
        count: 112,
      },
      {
        area: '衢州市',
        code: '',
        count: 112,
      },
      {
        area: '宁波市',
        code: '',
        count: 112,
      },
      {
        area: '绍兴市',
        code: '',
        count: 112,
      },
      {
        area: '湖州市',
        code: '',
        count: 112,
      },
      {
        area: '台州市',
        code: '',
        count: 112,
      },
      {
        area: '台州市',
        code: '',
        count: 112,
      },
    ],
  },
]

const AreaSearch = () => {
  const [activityKey, setActivetyKey] = useState<number>(0)
  const [areaList, setAreaList] = useState<Array<AreaItem>>([])

  const keys = [
    { label: '长三角', count: '3431' },
    { label: '珠三角', count: '3431' },
    { label: '环渤海', count: '3431' },
  ]

  useEffect(() => {
    const target = initAreaList.map((item) => {
      const len = item.children.length
      const newChildren: Array<AreaItem> = item.children.slice(0, 7)
      const useCount = item.children
        .slice(0, 7)
        .reduce((prev, i) => prev + i.count, 0)
      const moreCount = item.count - useCount
      len > 7 && newChildren.push({ area: '更多', count: moreCount })
      item.children = newChildren
      return item
    })
    setAreaList(target)
  }, [])

  const tabChange = (key: number) => {
    setActivetyKey(key)
  }

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchTitle}>
        <div className={styles.searchTitleL}>
          <div className={styles.searchTitleText}>按地区找工厂</div>
          <Button type={'primary'}>工厂入驻</Button>
        </div>
        <Button>{'更多 >'}</Button>
      </div>
      <div className={styles.searchContent}>
        <div className={styles.leftContent}>
          <div className={styles.areaKeys}>
            {keys.map((item, idx) => (
              <div
                key={idx}
                className={classNames(
                  styles.areaTab,
                  activityKey === idx && styles.areaActiveTab
                )}
                onClick={() => tabChange(idx)}
              >
                <span className={styles.areaTabL}>{item.label}</span>
                <span className={styles.areaTabC}>({item.count}个订单)</span>
              </div>
            ))}
          </div>
          <div>
            {areaList.map((item, idx) => {
              return (
                <div className={styles.areaChunk} key={idx}>
                  <div className={styles.areaChunkL}>
                    <Icon type={item.icon} className={styles.areaIcon} />
                    <span
                      style={{ color: item.color }}
                      className={styles.province}
                    >
                      {item.area}
                    </span>
                    <span>({item.count}个订单)</span>
                  </div>
                  <div className={styles.areaChunkR}>
                    {item.children.map((i, t) => {
                      if (t < 7) {
                        return (
                          <span className={styles.city} key={t}>
                            {i.area}
                            &nbsp; ({i.count})
                          </span>
                        )
                      }
                      return (
                        <span className={styles.city} key={t}>
                          {i.area}
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={styles.rightContent}>
          <MapTemp></MapTemp>
        </div>
      </div>
    </div>
  )
}

export default AreaSearch

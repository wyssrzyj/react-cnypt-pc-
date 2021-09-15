import React, { useEffect, useState } from 'react'
import { Title } from '../../controlPanel/accountSafe'
import styles from './onGoing.module.less'
import { Table } from 'antd'
import { getUId } from '@/utils/tool'
import { Icon } from '@/components'
import classNames from 'classnames'

const data = [
  {
    color: '白色',
    size: 'M',
    num: 100
  },
  {
    color: '花色',
    size: 'L',
    num: 100
  },
  {
    color: '黄色',
    size: 'XL',
    num: 100
  },
  {
    color: '白色',
    size: 'XXL',
    num: 100
  },
  {
    color: '米色',
    size: 'M',
    num: 20
  },
  {
    color: '米色',
    size: 'XXXL',
    num: 50
  },
  {
    color: '黑色色',
    size: 'XXXL',
    num: 100
  }
]

const formatData = data => {
  return data.reduce((prev, item) => {
    let index
    const target = prev.find((i, idx) => {
      if (item.color === i.color) {
        index = idx
        return true
      }
      return false
    })
    const size = item.size

    if (target) {
      if (!target[size]) {
        target[size] = item.num
      }
      target[size] = Number(item.num) + target[size] ? Number(target[size]) : 0

      const keys = Reflect.ownKeys(target)

      const total = keys.reduce((p, i) => {
        if (!['color', 'total', 'uid'].includes(i as string)) {
          return p + target[i]
        }
        return p
      }, 0)

      target.total = total
      prev[index] = target
      return prev
    }

    prev.push({
      [item.size]: Number(item.num),
      color: item.color,
      total: Number(item.num),
      uid: getUId()
    })
    return prev
  }, [])
}

const dealColumns = data => {
  const initColumns = [
    {
      title: '颜色/尺码',
      align: 'center',
      width: 100,
      dataIndex: 'color'
    }
  ]

  const cloumnsFields = data.reduce((prev, item) => {
    prev.push(item.size)
    return prev
  }, [])

  const cloumnsBody = Array.from(new Set(cloumnsFields)).map(item => ({
    title: item,
    align: 'center',
    dataIndex: item
  }))

  const columnsTotal = [
    {
      title: '小计',
      align: 'center',
      dataIndex: 'total'
    }
  ]
  const targetColumns = [].concat(initColumns, cloumnsBody, columnsTotal)
  return targetColumns || []
}

const OnGoing = () => {
  const [columns, setColumns] = useState([])
  const [progressKey, setProgressKey] = useState(0)
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    setColumns(dealColumns(data))
    setDataSource(formatData(data))
  }, [])

  const logisticsConfigs = [
    { label: '物流公司', field: 'a' },
    { label: '订单号', field: 'b' },
    { label: '发货日期', field: 'c' },
    { label: '收货地址', field: 'd' }
  ]

  const logisticsData = {
    a: '百世汇通',
    b: 'FHD00019',
    c: '2021-05-25',
    d: '北京市东城区和平里东街11号航星科技园航星3号楼5层'
  }

  const progressConfigs = [
    { label: '面辅料齐', field: 'a', icon: 'jack-textile-products' },
    { label: '裁剪', field: 'b', icon: 'jack-cut' },
    { label: '车缝', field: 'c', icon: 'jack-component' },
    { label: '质检', field: 'd', icon: 'jack-banzhengfuwu' },
    { label: '成衣入库', field: 'e', icon: 'jack-apparel' },
    { label: '生产单完成', field: 'f', icon: 'jack-shouhuoicon' }
  ]

  const progressData = {
    a: 700,
    b: 600,
    c: 600,
    d: 0,
    e: 0,
    f: 0
  }

  const changeProgressKey = index => {
    setProgressKey(index)
    const random = Math.floor(Math.random() * 5 + 1)
    const random2 = Math.floor(Math.random() * 6 + 1)
    const targetData = data.slice(0, random2)
    const target = formatData(targetData)
    setDataSource(target.slice(0, random))
    setColumns(dealColumns(targetData))
  }

  return (
    <div className={styles.goingContent}>
      <Title title={'生产进度'}></Title>
      <div className={styles.progressBox}>
        {progressConfigs.map((item, idx) => {
          return (
            <div
              className={classNames(
                styles.progressItem,
                progressKey === idx ? styles.activeProgress : ''
              )}
              key={idx}
              onClick={() => changeProgressKey(idx)}
            >
              <Icon
                type={item.icon}
                className={classNames(
                  styles.progressIcon,
                  idx % 2 ? styles.activeIcon : ''
                )}
              ></Icon>
              <div className={styles.progressContent}>
                <div className={styles.progressLabel}>{item.label}</div>
                <div>
                  <span className={styles.progressCount}>
                    {progressData[item.field]}
                  </span>
                  &nbsp;件
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.tableBox}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey={'uid'}
          pagination={false}
        ></Table>
      </div>

      <Title title={'物流信息'}></Title>
      <div className={styles.logistics}>
        {logisticsConfigs.map((item, idx) => {
          return (
            <div className={styles.logisticsItem} key={idx}>
              <div className={styles.label}>{item.label}</div>
              <div className={styles.value}>{logisticsData[item.field]}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OnGoing

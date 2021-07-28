import React, { useRef, useEffect, MutableRefObject, useState } from 'react'
import { Table } from 'antd'
import styles from './index.module.less'
import { ChartTitle } from '../charts/pieChart'
import { useStores, observer } from '@/utils/mobx'

const rowClassMap = new Map()
rowClassMap.set(0, styles.custemRowEven)
rowClassMap.set(1, styles.custemRowOdd)

const ScrollTable = () => {
  const { factoryStore } = useStores()
  const { factoryProductList } = factoryStore
  const colunms: any = [
    {
      title: '序号',
      dataIndex: 'order',
      align: 'center',
      render: (_, _row, index) => index + 1
    },
    {
      title: '设备名称',
      align: 'center',
      dataIndex: 'deptName'
    },
    {
      title: '设备数量',
      align: 'center',
      dataIndex: 'machineNum',
      render: val => `${val || 0}台`
    },
    {
      title: '生产进度',
      align: 'center',
      render: (_, row) => {
        const num = row.goal ? (row.production / row.goal) * 100 : 0
        return `${num ? num.toFixed(2) : 0}%`
      }
    },
    {
      title: '参考产量(件)',
      align: 'center',
      dataIndex: 'production'
    },
    {
      title: '目标产量(件)',
      align: 'center',
      dataIndex: 'goal'
    },
    {
      title: '平均工时',
      align: 'center',
      dataIndex: 'devEletime',
      render: val => `${val ? (val / 60 / 60).toFixed(2) : 0}小时`
    }
  ]

  const tabelBoxRef: MutableRefObject<HTMLDivElement> = useRef()
  const [scrollTimer, setScrollTimer] = useState(null)

  useEffect(() => {
    scrollPlay()
  }, [])

  const scrollPlay = () => {
    const target = tabelBoxRef.current
    const timer = setInterval(() => {
      let top = target.scrollTop + 5
      if (top >= target.scrollHeight - target.clientHeight) {
        target.scrollTop = 0
        top = 0
      }
      target.scrollTo(0, top)
    }, 200)
    setScrollTimer(timer)
  }

  const mouseEnter = () => {
    clearInterval(scrollTimer)
  }

  const mouseLeave = () => {
    scrollPlay()
  }

  return (
    <div className={styles.scrollTableBox}>
      <ChartTitle title={'生产进度列表'}></ChartTitle>
      <div
        className={styles.scrollTable}
        ref={tabelBoxRef}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseLeave}
      >
        <Table
          columns={colunms}
          dataSource={factoryProductList}
          pagination={false}
          rowClassName={(_record, index) => {
            return rowClassMap.get(index % 2)
          }}
          rowKey={'deptName'}
        ></Table>
      </div>
    </div>
  )
}

export default observer(ScrollTable)

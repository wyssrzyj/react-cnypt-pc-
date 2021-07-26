import React, { useRef, useEffect, MutableRefObject, useState } from 'react'
import { Table } from 'antd'
import styles from './index.module.less'
import { ChartTitle } from '../charts/pieChart'

const rowClassMap = new Map()
rowClassMap.set(0, styles.custemRowEven)
rowClassMap.set(1, styles.custemRowOdd)

const ScrollTable = () => {
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
      dataIndex: 'name'
    },
    {
      title: '设备数量',
      align: 'center',
      dataIndex: 'count',
      render: val => `${val}台`
    },
    {
      title: '生产进度',
      align: 'center',
      dataIndex: 'progress',
      render: val => `${val}%`
    },
    {
      title: '参考产量(件)',
      align: 'center',
      dataIndex: 'referenceProduction'
    },
    {
      title: '目标产量(件)',
      align: 'center',
      dataIndex: 'targetProduction'
    },
    {
      title: '平均工时',
      align: 'center',
      dataIndex: 'averageHours',
      render: val => `${val}小时`
    }
  ]

  const dataSource = [
    {
      id: 1,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 2,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 3,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 4,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 5,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 6,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 7,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 8,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
    },
    {
      id: 9,
      name: '铺布机',
      count: 20,
      progress: 50,
      referenceProduction: 50,
      targetProduction: 100,
      averageHours: 8
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
          dataSource={dataSource}
          pagination={false}
          rowClassName={(_record, index) => {
            return rowClassMap.get(index % 2)
          }}
          rowKey={'id'}
        ></Table>
      </div>
    </div>
  )
}

export default ScrollTable

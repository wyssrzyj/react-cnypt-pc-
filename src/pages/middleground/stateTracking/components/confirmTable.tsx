import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import styles from './confirmTable.module.less'
import { ColumnType } from 'antd/lib/table'
import { useStores } from '@/utils/mobx'

interface Columns {
  align?: string
  operator: string
  recordTime: string
  recordLogs: string
}

const ConfirmTable = () => {
  const { orderStore } = useStores()
  const { getStateTrack } = orderStore

  const [current, setCurrent] = useState<number>(1)
  const [total, _setTotal] = useState<number>(100)

  const columns: Array<ColumnType<Columns>> = [
    {
      title: '操作人',
      dataIndex: 'operator',
      align: 'center'
    },
    {
      title: '记录时间',
      dataIndex: 'recordTime',
      align: 'center'
    },
    {
      title: '日志记录',
      dataIndex: 'recordLogs',
      align: 'center'
    }
  ]

  const dataSource = [
    {
      id: '1',
      operator: '成都助战科技有限公司',
      recordTime: '2021-05-31 14:17:25',
      recordLogs: '新增订单，保存为草稿'
    }
  ]

  const tableChange = (page, _pageSize) => {
    setCurrent(page)
  }

  useEffect(() => {
    console.log(current)
  }, [current, getStateTrack])

  return (
    <div className={styles.tableBox}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current,
          pageSize: 20,
          total: total,
          onChange: tableChange
        }}
        rowKey={'id'}
      ></Table>
    </div>
  )
}

export default ConfirmTable

import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import styles from './confirmTable.module.less'
import { ColumnType } from 'antd/lib/table'
import { useStores, observer } from '@/utils/mobx'
import moment from '_moment@2.29.1@moment'

interface Columns {
  align?: string
  operator: string
  recordTime: string
  recordLogs: string
}

const ConfirmTable = props => {
  const { curStep } = props
  const { orderStore } = useStores()
  const { getStateTrack, stateTrackData } = orderStore

  const [current, setCurrent] = useState<number>(1)
  const [totalCount, setTotal] = useState<number>(0)
  const [dataSource, setDataSource] = useState<any[]>([])

  useEffect(() => {
    const targetData = curStep
      ? stateTrackData.finishLogsPage
      : (stateTrackData.confirmLogsPage as any)
    const { records = [], total = 0 } = targetData
    setDataSource(records)
    setTotal(total)
  }, [curStep, stateTrackData])

  const columns: Array<ColumnType<Columns>> = [
    {
      title: '操作人',
      dataIndex: 'updateBy',
      align: 'center'
    },
    {
      title: '记录时间',
      dataIndex: 'updateTime',
      align: 'center',
      render: val => (val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : null)
    },
    {
      title: '日志记录',
      dataIndex: 'log',
      align: 'center'
    }
  ]

  const tableChange = (page, _pageSize) => {
    setCurrent(page)
  }

  useEffect(() => {}, [current, getStateTrack])

  return (
    <div className={styles.tableBox}>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          current,
          pageSize: 20,
          total: totalCount,
          onChange: tableChange
        }}
        rowKey={'id'}
      ></Table>
    </div>
  )
}

export default observer(ConfirmTable)

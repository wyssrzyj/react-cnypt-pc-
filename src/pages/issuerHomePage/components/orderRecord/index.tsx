import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Table } from 'antd'
import { useStores, toJS } from '@/utils/mobx'
import { useLocation } from 'react-router-dom'
import moment from 'moment'
function index() {
  const location = useLocation()
  const { state } = location
  const id = state['id']
  const { demandListStore, commonStore } = useStores()
  const { dictionary } = commonStore
  const { goodsNum = [] } = toJS(dictionary)
  const { issuerDemandDocLoGQuery } = demandListStore
  const [list, setList] = useState([])
  useEffect(() => {
    dataAcquisition()
  }, [])
  //  数据获取
  const dataAcquisition = async () => {
    const arr = await issuerDemandDocLoGQuery({ tenantId: id })
    const data = arr.records
    data.map(item => {
      item.operationTime = moment(item.operationTime).format('YYYY-MM-DD')
      item.amount = goodsNum.filter(v => v.value === item.amount)[0].label
      item.key = item.id
    })
    setList(data)
  }
  const columns: any = [
    {
      title: '时间',
      dataIndex: 'operationTime',
      align: 'center',
      key: 'name',
      render: text => <span>{text}</span>
    },
    {
      title: '内容描述',
      dataIndex: 'contentDescription',
      align: 'center',
      key: 'age',

      render: (_text, _v) => (
        <>
          <div className={styles.commodity}>
            <div className={styles.yuan}></div>
            <div className={styles.commodityData}>
              <div>{_v.contentDescription}</div>
              <div className={styles.test}>
                <span>{_v.amount}</span>
              </div>
            </div>
          </div>
        </>
      )
    }
  ]

  return (
    <div>
      <div className={styles.data}>
        <div className={styles.dataTop}>
          <div className={styles.title}>订单详情&nbsp;&nbsp;</div>
          <div className={styles.division}>
            {/* 表格 */}
            <Table
              pagination={{
                //分页
                showQuickJumper: false, //是否快速查找
                position: ['bottomCenter'] //居中
              }}
              columns={columns}
              dataSource={list}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default index

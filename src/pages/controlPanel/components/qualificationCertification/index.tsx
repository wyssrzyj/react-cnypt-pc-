import React, { useState } from 'react'
import { Tabs, Table, Button } from 'antd'
import QualificationModal from '../qualificationModal'
import styles from './index.module.less'

const { TabPane } = Tabs

const tabMaps = [
  { label: '所有资质', value: '所有资质' },
  { label: '已生效', value: '已生效' },
  { label: '审核中', value: '审核中' },
  { label: '审核不通过', value: '审核不通过' },
  { label: '已失效', value: '已失效' }
]

const QualificationCertification = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const dataSource = [
    {
      key: '1',
      name: '国际管理体系认证：BSCI',
      number: '343812',
      time: '永久有效',
      state: '已生效'
    },
    {
      key: '2',
      name: '国际管理体系认证：BSCI',
      number: '343812',
      time: '永久有效',
      state: '审批中'
    },
    {
      key: '2',
      name: '国际管理体系认证：BSCI',
      number: '343812',
      time: '永久有效',
      state: '已失效'
    },
    {
      key: '2',
      name: '国际管理体系认证：BSCI',
      number: '343812',
      time: '永久有效',
      state: '审批不通过'
    }
  ]

  const columns = [
    {
      title: '资质名称',
      dataIndex: 'name',
      key: 'name',
      sorter: true
    },
    {
      title: '证书编号',
      dataIndex: 'number',
      key: 'number'
    },
    {
      title: '失效时间',
      dataIndex: 'time',
      key: 'time',
      sorter: true
    },
    {
      title: '状态',
      dataIndex: 'state',
      key: 'state',
      sorter: true
    },
    {
      title: '资质照片',
      dataIndex: 'photo',
      key: 'photo',
      render: () => {
        return (
          <img
            className={styles.photo}
            src={require('@/static/images/u1874.png')}
            alt=""
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (value, row) => {
        console.log(value)
        const { state } = row
        return (
          <div className={styles.operationBox}>
            {state !== '已失效' && <a className={styles.boxItem}>查看</a>}
            <a className={styles.boxItem}>编辑</a>
            {(state == '已失效' || state === '审批不通过') && (
              <a className={styles.boxItem}>删除</a>
            )}
          </div>
        )
      }
    }
  ]
  const addQualification = () => {
    setIsModalVisible(true)
  }
  return (
    <div className={styles.qualificationCertification}>
      <Button
        onClick={addQualification}
        className={styles.addButton}
        type="primary"
      >
        新增资质
      </Button>
      <Tabs type="card" size="large">
        {tabMaps.map(tab => (
          <TabPane tab={tab.label} key={tab.value}>
            <Table
              className={styles.qualificationTable}
              dataSource={dataSource}
              columns={columns}
              pagination={{
                size: 'small'
              }}
            />
          </TabPane>
        ))}
      </Tabs>
      {isModalVisible && <QualificationModal visible={isModalVisible} />}
    </div>
  )
}

export default QualificationCertification

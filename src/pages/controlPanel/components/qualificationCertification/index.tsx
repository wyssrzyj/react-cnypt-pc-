import React, { useState, useEffect } from 'react'
import { Tabs, Table, Button, message, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { toJS } from 'mobx'
import moment from 'moment'
import { useStores } from '@/utils/mobx'
import axios from '@/utils/axios'
import { get, find } from 'lodash'
import QualificationModal from '../qualificationModal'
import styles from './index.module.less'

const { TabPane } = Tabs

const tabMaps = [
  { label: '所有资质', value: '' },
  { label: '已生效', value: 0 },
  { label: '审核中', value: 1 },
  { label: '审核不通过', value: 2 },
  { label: '已失效', value: 3 }
]
const statusMap = { 0: '已生效', 1: '审核中', 2: '审核不通过', 3: '已失效' }

const rowKey = 'id'

const QualificationCertification = () => {
  const pageSize = 5
  const { commonStore } = useStores()
  const { dictionary } = commonStore
  const { factoryCertificate = [] } = toJS(dictionary)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pageNum, setPageNum] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [dataSource, setDataSource] = useState<any>([])
  const [activeTab, setActiveTab] = useState('')
  const [loading, setLoading] = useState<boolean>(true)
  const [operationType, setOperationType] = useState<string>('add')
  const [currentData, setCurrentData] = useState<any>({})

  const columns = [
    {
      title: '资质名称',
      dataIndex: 'certificationName',
      key: 'certificationName',
      sorter: true,
      render: value => {
        return find(factoryCertificate, function (o) {
          return o.value === value
        }).label
      }
    },
    {
      title: '证书编号',
      dataIndex: 'certificationCode',
      key: 'certificationCode'
    },
    {
      title: '失效时间',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
      sorter: true,
      render: value => {
        return moment(value).format('YYYY-MM-DD')
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      sorter: true,
      render: value => {
        return get(statusMap, value)
      }
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
        const { status, factoryId, certificationName } = row
        const name = find(factoryCertificate, function (o) {
          return o.value === certificationName
        }).label
        return (
          <div className={styles.operationBox}>
            {status !== 3 && (
              <a
                className={styles.boxItem}
                onClick={() => operationCertificate(factoryId, 'check')}
              >
                查看
              </a>
            )}
            <a
              className={styles.boxItem}
              onClick={() => operationCertificate(factoryId, 'edit')}
            >
              编辑
            </a>
            {(status == 3 || status === 2) && (
              <a
                className={styles.boxItem}
                onClick={() => deleteCertificate(factoryId, name)}
              >
                删除
              </a>
            )}
          </div>
        )
      }
    }
  ]

  const getQualificationList = async () => {
    setLoading(true)
    const response = await axios.post('/api/factory/factory-certificate/list', {
      pageNum,
      pageSize,
      status: activeTab
    })
    const { success, data = [] } = response
    if (success) {
      const { records, total } = data
      setTotal(total)
      setDataSource([...records])
    }
    setLoading(false)
  }

  const addQualification = () => {
    setIsModalVisible(true)
    setCurrentData({})
  }
  const onTableChange = (pagination, filters, sorter) => {
    console.log({ pagination, filters, sorter })
    const { current } = pagination
    setPageNum(current)
  }
  const onTabChange = activeKey => {
    setActiveTab(activeKey)
  }
  const operationCertificate = (factoryId, type) => {
    setOperationType(type)
    axios
      .get('/api/factory/factory-certificate/list-factory-id', { factoryId })
      .then(response => {
        const { success, data } = response
        if (success) {
          setCurrentData({ ...data[0] })
          setIsModalVisible(true)
        }
      })
  }
  const deleteCertificate = (id, name) => {
    Modal.confirm({
      title: `确认删除 ${name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        axios
          .delete('/api/factory/factory-certificate/delete', { id })
          .then(response => {
            const { success, msg } = response
            message[success ? 'success' : 'error'](msg)
            success && getQualificationList()
          })
      }
    })
  }

  useEffect(() => {
    getQualificationList()
  }, [pageNum, activeTab])

  return (
    <div className={styles.qualificationCertification}>
      <Button
        onClick={addQualification}
        className={styles.addButton}
        type="primary"
      >
        新增资质
      </Button>
      <Tabs
        type="card"
        size="large"
        activeKey={activeTab}
        onChange={onTabChange}
      >
        {tabMaps.map(tab => (
          <TabPane tab={tab.label} key={tab.value}>
            <Table
              rowKey={rowKey}
              loading={loading}
              className={styles.qualificationTable}
              dataSource={dataSource}
              columns={columns}
              onChange={onTableChange}
              pagination={{
                size: 'small',
                total,
                current: pageNum,
                pageSize
              }}
            />
          </TabPane>
        ))}
      </Tabs>
      {isModalVisible && (
        <QualificationModal
          visible={isModalVisible}
          type={operationType}
          current={currentData}
          handleOk={getQualificationList}
          handleCancel={() => setIsModalVisible(false)}
        />
      )}
    </div>
  )
}

export default QualificationCertification

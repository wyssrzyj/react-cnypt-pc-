import React, { useState, useEffect } from 'react'
import { Tabs, Table, Button, message, Modal, Image } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { toJS } from 'mobx'
import moment from 'moment'
import { useStores } from '@/utils/mobx'
import axios from '@/utils/axios'
import { get, find, isEmpty } from 'lodash'
import Title from '../title'
import { getUserInfo } from '@/utils/tool'
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
  const currentUser = getUserInfo() || {}
  const { enterpriseId, factoryId } = currentUser
  // const enterpriseInfo =
  //   JSON.parse(localStorage.getItem('enterpriseInfo')) || {}
  // const newFactoryId = isEmpty(enterpriseInfo)
  //   ? factoryId
  //   : enterpriseInfo.factoryId
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
  const [sortField, setSortField] = useState<string>('')
  const [sortType, setSortType] = useState<string>('')
  const columns = [
    {
      title: '资质名称',
      dataIndex: 'certificationName',
      key: 'certification_name',
      sorter: true,
      render: value => {
        const name =
          find(factoryCertificate, function (o) {
            return o.value === value
          }) || {}
        return name.label
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
      key: 'expiry_date',
      sorter: true,
      render: (value, row) => {
        const { neverExpire } = row
        const date = neverExpire
          ? '永久有效'
          : moment(value).format('YYYY年MM月DD日')
        return date
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
      dataIndex: 'certificateImageURI',
      key: 'certificateImageURI',
      render: value => {
        return <Image width={100} height={100} src={value} />
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_value, row) => {
        const { id, certificationName } = row
        const newName =
          find(factoryCertificate, function (o) {
            return o.value === certificationName
          }) || {}
        const name = newName.label
        return (
          <div className={styles.operationBox}>
            <a
              className={styles.boxItem}
              onClick={() => operationCertificate(id, 'edit')}
            >
              编辑
            </a>
            <a
              className={styles.boxItem}
              onClick={() => deleteCertificate(id, name)}
            >
              删除
            </a>
            {/* {(status == 3 || status === 2) && (
            )} */}
          </div>
        )
      }
    }
  ]

  const getQualificationList = () => {
    setLoading(true)
    axios
      .post('/api/factory/enterprise-qualification-certificate/list', {
        pageNum,
        pageSize,
        status: activeTab,
        enterpriseId: enterpriseId,
        sortField,
        sortType
      })
      .then(response => {
        const { success, data = [] } = response
        if (success) {
          const { records, total } = data
          setTotal(total)
          setDataSource([...records])
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  //新增
  const addQualification = () => {
    setIsModalVisible(true)
    setCurrentData({})
    setOperationType('add')
  }
  const onTableChange = (pagination, _filters, sorter) => {
    const { current } = pagination
    setPageNum(current)
    if (!isEmpty(sorter)) {
      const { columnKey, order } = sorter
      setSortField(columnKey)
      setSortType(order === 'ascend' ? 'asc' : 'desc')
    }
  }
  const onTabChange = activeKey => {
    setActiveTab(activeKey)
  }
  const operationCertificate = (id, type) => {
    setOperationType(type)
    axios
      .get('/api/factory/enterprise-qualification-certificate/get', { id })
      .then(response => {
        const { success, data } = response
        if (success) {
          setCurrentData({ ...data })
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
          .delete('/api/factory/enterprise-qualification-certificate/delete', {
            id
          })
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
  }, [pageNum, activeTab, sortField])

  return (
    <div className={styles.qualificationCertification}>
      <Title title={'资质认证'} />
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
          factoryId={factoryId}
          current={currentData}
          handleOk={getQualificationList}
          handleCancel={() => setIsModalVisible(false)}
        />
      )}
    </div>
  )
}

export default QualificationCertification

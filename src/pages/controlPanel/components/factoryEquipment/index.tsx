import React, { useState, useEffect } from 'react'
import { Button, Table, Image, message } from 'antd'
import { toJS } from 'mobx'
import axios from '@/utils/axios'
import { useStores, observer } from '@/utils/mobx'
import { getUserInfo } from '@/utils/tool'

const rowKey = 'id'
const FactoryEquipment = () => {
  const currentUser = getUserInfo() || {}
  const { factoryId } = currentUser
  const pageSize = 10
  const { commonStore } = useStores()

  const { dictionary } = commonStore
  const { factoryEquipmentType = [] } = toJS(dictionary)

  const [pageNum, setPageNum] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<any>([])

  const columns = [
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: value => {
        return factoryEquipmentType.find(item => item.value === value)
          ? factoryEquipmentType.find(item => item.value === value).label
          : value
      }
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      key: 'brand'
    },
    {
      title: '型号',
      dataIndex: 'model',
      key: 'model',
      render: value => {
        return value ? value : '--'
      }
    },
    {
      title: '设备照片',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      render: value => {
        return value ? <Image width={100} src={value} /> : '无'
      }
    },
    {
      title: '数量（台）',
      dataIndex: 'number',
      key: 'number'
    }
  ]
  const onPaginationChange = page => {
    setPageNum(page)
    setTotal(0)
  }
  const getEquipment = () => {
    setLoading(true)
    axios
      .post('/api/factory/equipment/list', {
        pageNum,
        pageSize,
        factoryId
      })
      .then(response => {
        const { success, data } = response
        if (success) {
          const { records, total } = data
          setTotal(total)
          setDataSource([...records])
        } else {
          setTotal(0)
          setDataSource([])
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const applyInspection = () => {
    axios
      .put('/api/factory/info/update-factory-auditor-status', {
        factoryId,
        auditorStatus: '3'
      })
      .then(response => {
        const { success, msg } = response
        message[success ? 'success' : 'error'](msg)
      })
  }

  useEffect(() => {
    getEquipment()
  }, [])
  return (
    <div style={{ backgroundColor: '#fff', padding: 20 }}>
      <Button
        style={{ margin: '20px 0' }}
        type="primary"
        onClick={applyInspection}
      >
        设备更新，申请再次验厂
      </Button>
      <Table
        rowKey={rowKey}
        loading={loading}
        size="small"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          current: pageNum,
          pageSize,
          total,
          onChange: onPaginationChange
        }}
      />
    </div>
  )
}

export default observer(FactoryEquipment)

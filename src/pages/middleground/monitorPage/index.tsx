import React, { useState, useEffect, memo } from 'react'
import { useStores } from '@/utils/mobx'
import { Icon } from '@/components'
import styles from './index.module.less'
import { Divider, Input, Button, Table, Space, Tooltip } from 'antd'
import DeletePopup from './components/deletePopup'
import EquipmentModal from './components/equpimentModal'
import BindModal from './components/bindModal'

const rowKey = 'id'
const dealTypeData = (data: any[]) => {
  data.forEach(item => {
    item.label = item.deptName
    item.value = item.id
    item.key = item.id
    if (Array.isArray(item.children) && item.children.length) {
      dealTypeData(item.children)
    }
  })
  return data
}
const MonitorPage = memo(() => {
  const { monitorPageStore } = useStores()
  const { getDataList, deleteEvent, checkBind } = monitorPageStore

  const [list, setList] = useState([]) //数据

  const [bindVisible, setBindVisible] = useState(false)
  const [bindStatus, setBindStatus] = useState(false) // add 新增 edit 编辑
  const [equipmentVisible, setEquipmentVisible] = useState(false)
  const [equipmentType, setEquipmentType] = useState('add') // add 新增 edit 编辑
  const [targetId, setTargetId] = useState('') // add 新增 edit 编辑

  const [deletionFailed, setDeletionFailed] = useState(false) //删除设备
  const [moved, setMoved] = useState<any>(0) // 删除id
  const [equipmentName, setEquipmentName] = useState<any>(null) //查询name
  const [total, setTotal] = useState<any>(null) //数据长度
  const [pageNum, setPageNum] = useState<number>(1) //当前页数
  const [pageSize, setPageSize] = useState(10) //
  const [numberofequipment, setNumberofequipment] = useState(false) //
  const [agreementPop, setAgreementPop] = useState(null)
  const getFactoryInfo = async () => {
    const response = await getDataList({
      name: equipmentName,
      pageSize,
      pageNum
    })
    setTotal(response.total) //数据长度
    setList(response.records)
  }

  const onSearchInput = e => {
    setAgreementPop(e.target.value)
  }

  const queryClick = () => {
    setEquipmentName(agreementPop)
    if (agreementPop == 0) {
      setNumberofequipment(false)
    } else {
      setNumberofequipment(true)
    }
  }
  // 当前页数
  const Paginationclick = (page, pageSize) => {
    setPageSize(pageSize)
    setPageNum(page)
  }
  const columns: any = [
    {
      title: '设备名称',
      dataIndex: 'name',
      align: 'center',
      key: 'name'
    },
    {
      title: '设备品牌',
      dataIndex: 'brand',
      align: 'center',
      key: 'brand',
      render() {
        return <span>萤石</span>
      }
    },
    {
      title: '设备序列号',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
      align: 'center'
    },
    {
      title: '连接状态',
      key: 'status',
      align: 'center',
      dataIndex: 'status',
      sorter: (a, b) => a.status - b.status,

      render(value) {
        return value ? (
          <span className={styles.success}>成功</span>
        ) : (
          <span className={styles.fail}>失败</span>
        )
      }
    },
    {
      title: '所属部门',
      align: 'center',
      key: 'orgNameList',
      width: 180,
      dataIndex: 'orgNameList',
      render: (value, record) => {
        console.log(
          '🚀 ~ file: index.tsx ~ line 113 ~ MonitorPage ~ record',
          record
        )
        if (record.orgNameList.length > 1) {
          return (
            <Tooltip placement="top" title={record.orgNameList.join('、')}>
              <span className={styles.departments}>
                {record.orgNameList.join('、')}
              </span>
            </Tooltip>
          )
        } else {
          // setTooltipText(value)
          return value
        }
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 210,
      key: 'action',

      render: record => (
        <Space size="middle">
          <span className={styles.edit} onClick={() => editEquipment(record)}>
            编辑
          </span>

          <span className={styles.vertical}>|</span>
          <span
            className={styles.edit}
            onClick={() => {
              deleteDeviceDisplay(record.id)
            }}
          >
            {' '}
            删除
          </span>
          <span className={styles.vertical}>|</span>

          <span
            className={styles.edit}
            onClick={() => bindModalChange(record.id)}
          >
            绑定工票部门
          </span>
        </Space>
      )
    }
  ]

  const bindModalChange = async id => {
    if (id) {
      setTargetId(id)
      const res = await checkBind()
      setBindStatus(!!res.data)
    }
    setBindVisible(f => !f)
  }

  //删除设备
  const deleteDeviceDisplay = id => {
    setMoved(id)
    setDeletionFailed(true)
  }
  const deleteDeviceCancel = async () => {
    const deletion = await deleteEvent(moved)
    if (deletion.code == 200) {
      getFactoryInfo()
      setDeletionFailed(false)
    }
  }

  const equipmentModalChange = () => {
    setEquipmentVisible(f => !f)
    if (equipmentVisible) {
      setTargetId('')
    }
  }

  const addEquipment = () => {
    setEquipmentType('add')
    equipmentModalChange()
  }

  const editEquipment = rData => {
    const { id } = rData
    setTargetId(id)
    setEquipmentType('edit')
    equipmentModalChange()
  }

  useEffect(() => {
    if (!equipmentVisible) {
      getFactoryInfo()
    }
  }, [pageNum, pageSize, equipmentName, equipmentVisible])

  return (
    <div className={styles.monitor}>
      <div>{/* <TreeSelect {...tProps} /> */}</div>
      <div>
        <span className={styles.system}>监控列表</span>
      </div>
      <Divider />
      <div className={styles.header}>
        <div className={styles.equipment}>
          <div>
            <span className={styles.keynote}>
              设备关键名字
              <div className={styles.keynoteInput}>
                <Input maxLength={400} type="text" onChange={onSearchInput} />
              </div>
              <Button
                type="primary"
                className={styles.chauxn}
                onClick={queryClick}
              >
                查询
              </Button>
            </span>
          </div>

          <span className={styles.pmentkeynote}></span>

          <Button
            icon={<Icon type="jack-del" className={styles.del} />}
            className={styles.added}
            onClick={addEquipment}
          >
            新增设备
          </Button>
        </div>
      </div>
      <div className={styles.tableParent}>
        <Table
          className={styles.table}
          columns={columns}
          dataSource={list}
          rowKey={rowKey}
          pagination={{
            showQuickJumper: false, //是否快速查找
            pageSize, //每页条数
            showSizeChanger: true, //展示切换器
            current: pageNum, //	当前页数
            total, //数据总数
            position: ['bottomCenter'], //居中
            onChange: Paginationclick //获取当前页码是一个function
          }}
        ></Table>
        {numberofequipment ? (
          <h3 className={styles.totalEquipment}>查询的设备共: {total} 件</h3>
        ) : (
          <h3 className={styles.totalEquipment}>设备数量共: {total} 件</h3>
        )}
      </div>

      {/* 设备弹窗 */}
      {equipmentVisible ? (
        <EquipmentModal
          visible={equipmentVisible}
          onCancel={equipmentModalChange}
          type={equipmentType}
          id={targetId}
        ></EquipmentModal>
      ) : null}

      {/* 绑定优产账号弹窗 */}
      {bindVisible ? (
        <BindModal
          visible={bindVisible}
          onCancel={bindModalChange}
          id={targetId}
          status={bindStatus}
          // key={targetId}
        ></BindModal>
      ) : null}

      {/* 删除设备 */}
      <DeletePopup
        deleteDeviceCancel={deleteDeviceCancel}
        visible={deletionFailed}
        onClick={() => {
          setDeletionFailed(false)
        }}
      />
    </div>
  )
})
export default MonitorPage

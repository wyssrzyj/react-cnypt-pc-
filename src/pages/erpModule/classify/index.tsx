import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message, Switch, Divider } from 'antd'
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { get } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import { GroupList, GroupModal, AddModal } from '../components'
import styles from './index.module.less'

const titleMap = { add: '新增分组', edit: '编辑分组' }

const rowKey = 'id'

const Classify = () => {
  const pageSize = 10
  const { erpModuleStore } = useStores()
  const {
    goodGroupLists,
    editGoodGroup,
    goodClassifyLists,
    editGoodClassify,
    currentClassifyId,
    deleteGood
  } = erpModuleStore
  const [groupModalVisible, setGroupModalVisible] = useState<boolean>(false)
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [groupTitle, setGroupTitle] = useState<string>('')
  const [classifyTitle, setClassifyTitle] = useState<string>('')
  const [pageNum, setPageNum] = useState<number>(1)
  const [tablePageNum, setTablePageNum] = useState<number>(1)
  const [currentClassify, setCurrentClassify] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [options, setOptions] = useState<any>([])
  const [groupDataSource, setGroupDataSource] = useState<any>([])
  const [groupTotal, setGroupTotal] = useState<number>(0)
  const [currentGroup, setCurrentGroup] = useState<any>({})

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: (_value, _row, index) => index + 1
    },
    {
      title: '系统编号',
      dataIndex: 'code',
      key: 'code'
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '组内排序',
      dataIndex: 'sortNo',
      key: 'sortNo'
    },
    {
      title: '组名',
      dataIndex: 'groupId',
      key: 'groupId',
      render: value => {
        const current = options.find(option => option.id === value) || {}
        return current.name
      }
    },
    {
      title: '状态',
      dataIndex: 'openStatus',
      key: 'openStatus',
      render: value => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={value}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_value, row) => {
        const { name, id } = row
        return (
          <>
            <a onClick={() => addClassify(row)}>编辑</a>
            <Divider type="vertical" />
            <a
              onClick={() => {
                deleteClassify(name, id)
              }}
            >
              删除
            </a>
          </>
        )
      }
    }
  ]

  // 删除商品分类
  const deleteClassify = (name, id) => {
    Modal.confirm({
      title: `确认删除 ${name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteGood('category', id).then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && getGoodClassifyLists()
        })
      }
    })
  }
  const handleGroup = type => {
    setGroupTitle(get(titleMap, type))
    //新增
    if (type === 'add') {
      setGroupModalVisible(true)
    } else {
      if (currentClassifyId) {
        type === 'delete' && deleteGroup() // 删除
        type === 'edit' && setGroupModalVisible(true) //编辑
      } else {
        message.warning('请先选择要操作的分组！')
      }
    }
  }

  const deleteGroup = () => {
    const { name, id } = currentGroup
    Modal.confirm({
      title: `确认删除 ${name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteGood('group', id).then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && getGoodGroupLists()
        })
      }
    })
  }

  const addClassify = (values = {}) => {
    setAddModalVisible(true)
    setClassifyTitle('分类')
    setCurrentClassify({ ...values })
  }

  const getGoodGroupLists = () => {
    goodGroupLists('product', {
      pageNum,
      pageSize
    }).then(response => {
      const { data, success } = response
      if (success) {
        const { total, records } = data
        setGroupDataSource([...records])
        setGroupTotal(total)
      } else {
        setGroupDataSource([])
        setGroupTotal(0)
      }
    })
  }

  const getAllGoodGroup = () => {
    goodGroupLists('product', {
      pageNum: 1,
      pageSize: 10000
    }).then(response => {
      const { success, data } = response
      if (success) {
        const { records } = data
        setOptions([...records])
      }
    })
  }

  // 新建/更新商品分类的分组
  const operationGoodGroup = values => {
    editGoodGroup('product', {
      ...values,
      id: currentGroup.id
    }).then(response => {
      const { success, msg } = response
      message[success ? 'success' : 'error'](msg)
      success && getGoodGroupLists()
      setGroupModalVisible(false)
    })
  }

  // 查询所有的商品分类
  const getGoodClassifyLists = () => {
    setLoading(true)
    goodClassifyLists({
      pageNum: tablePageNum,
      pageSize,
      groupId: currentClassifyId ? currentClassifyId : undefined
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

  // 新建/更新商品分类
  const operationGoodClassify = values => {
    editGoodClassify({
      ...values,
      openStatus: values.status ? 1 : 0,
      id: currentClassify.id ? currentClassify.id : undefined
    }).then(response => {
      const { success, msg } = response
      message[success ? 'success' : 'error'](msg)
      if (success) {
        getGoodClassifyLists()
        getAllGoodGroup()
      }
      setAddModalVisible(false)
    })
  }

  const onPaginationChange = page => {
    setTablePageNum(page)
  }

  const listPaginationChange = page => {
    setPageNum(page)
  }

  useEffect(() => {
    if (currentClassifyId) {
      const current =
        groupDataSource.find(data => data.id === currentClassifyId) || {}
      setCurrentGroup({ ...current })
      getGoodClassifyLists()
    }
  }, [currentClassifyId])

  useEffect(() => {
    getGoodClassifyLists()
  }, [tablePageNum])

  useEffect(() => {
    getGoodGroupLists()
  }, [pageNum])

  useEffect(() => {
    getAllGoodGroup()
  }, [])

  return (
    <div className={styles.classify}>
      <div className={styles.left}>
        <GroupList
          handleGroup={handleGroup}
          dataSource={groupDataSource}
          total={groupTotal}
          type="classify"
          paginationChange={listPaginationChange}
        />
      </div>
      <div className={styles.right}>
        <Button type="primary" onClick={() => addClassify({})}>
          新增商品分类
        </Button>
        <Table
          rowKey={rowKey}
          loading={loading}
          className={styles.table}
          dataSource={dataSource}
          columns={columns}
          pagination={{
            size: 'small',
            current: tablePageNum,
            pageSize,
            total,
            onChange: onPaginationChange
          }}
        />
      </div>
      {/* 新增 编辑 分组 弹框 */}
      {groupModalVisible && (
        <GroupModal
          title={groupTitle}
          visible={groupModalVisible}
          current={currentGroup}
          handleCancel={() => setGroupModalVisible(false)}
          handleOk={operationGoodGroup}
        />
      )}
      {/* 新增商品分类 弹框 */}
      {addModalVisible && (
        <AddModal
          visible={addModalVisible}
          title={classifyTitle}
          current={currentClassify}
          groupOptions={options}
          handleCancel={() => setAddModalVisible(false)}
          handleOk={operationGoodClassify}
        />
      )}
    </div>
  )
}

export default observer(Classify)

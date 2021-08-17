import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message, Switch, Divider } from 'antd'
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { get } from 'lodash'
import { useStores } from '@/utils/mobx'
import { getUserInfo } from '@/utils/tool'
import { GroupList, GroupModal, AddModal } from '../components'
import styles from './index.module.less'

const titleMap = { add: '新增分组', edit: '编辑分组' }

const rowKey = 'id'

const Classify = () => {
  const pageSize = 10
  const { erpModuleStore } = useStores()
  const { goodGroupLists, editGoodGroup, goodClassifyLists, editGoodClassify } =
    erpModuleStore
  const [groupModalVisible, setGroupModalVisible] = useState<boolean>(false)
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [groupTitle, setGroupTitle] = useState<string>('')
  const [classifyTitle, setClassifyTitle] = useState<string>('')
  const [pageNum, _setPageNum] = useState<number>(1)
  const [tablePageNum, setTablePageNum] = useState<number>(1)
  const [currentClassify, setCurrentClassify] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(true)
  const [dataSource, setDataSource] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [options, setOptions] = useState<any>([])
  const [groupDataSource, setGroupDataSource] = useState<any>([])
  const [groupTotal, setGroupTotal] = useState<number>(0)

  const userInfo = getUserInfo() || {}
  const { factoryId } = userInfo

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index'
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
      key: 'groupId'
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
        return (
          <>
            <a onClick={() => addClassify(row)}>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </>
        )
      }
    }
  ]
  const handleGroup = type => {
    if (type === 'delete') {
      // 删除
      deleteGroup(1, 'aa')
    } else {
      setGroupTitle(get(titleMap, type))
      setGroupModalVisible(true)
    }
  }

  const deleteGroup = (id, name) => {
    Modal.confirm({
      title: `确认删除 ${name} ${id} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {}
    })
  }

  const addClassify = (values = {}) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 113 ~ addClassify ~ values',
      values
    )
    setAddModalVisible(true)
    setClassifyTitle('分类')
    setCurrentClassify({ ...values })
  }

  const getGoodGroupLists = () => {
    goodGroupLists({
      factoryId,
      pageNum,
      pageSize
    }).then(response => {
      console.log(
        '🚀 ~ file: index.tsx ~ line 78 ~ goodGroupLists ~ response',
        response
      )
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
    goodGroupLists({
      factoryId,
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
    console.log(
      '🚀 ~ file: index.tsx ~ line 97 ~ operationGoodGroup ~ values',
      values
    )
    editGoodGroup({
      factoryId,
      ...values
    }).then(response => {
      console.log(
        '🚀 ~ file: index.tsx ~ line 98 ~ editGoodGroup ~ response',
        response
      )
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
      factoryId,
      pageNum: tablePageNum,
      pageSize
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
    console.log('🚀 ~ file: index.tsx ~ line 134 ~ Classify ~ values', values)
    editGoodClassify({
      factoryId,
      ...values
    }).then(response => {
      console.log(
        '🚀 ~ file: index.tsx ~ line 137 ~ operationGoodClassify ~ response',
        response
      )
      const { success, msg } = response
      message[success ? 'success' : 'error'](msg)
      success && getGoodClassifyLists()
      setAddModalVisible(false)
    })
  }

  const onPaginationChange = page => {
    setTablePageNum(page)
  }

  useEffect(() => {
    getAllGoodGroup()
    getGoodGroupLists()
  }, [])

  useEffect(() => {
    getGoodClassifyLists()
  }, [tablePageNum])

  return (
    <div className={styles.classify}>
      <div className={styles.left}>
        <GroupList
          handleGroup={handleGroup}
          dataSource={groupDataSource}
          total={groupTotal}
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
            current: tablePageNum,
            pageSize,
            total,
            onChange: onPaginationChange
          }}
        />
      </div>
      {/* 新增 编辑 分组 弹框 */}
      <GroupModal
        title={groupTitle}
        visible={groupModalVisible}
        handleCancel={() => setGroupModalVisible(false)}
        handleOk={operationGoodGroup}
      />
      {/* 新增商品分类 弹框 */}
      <AddModal
        visible={addModalVisible}
        title={classifyTitle}
        current={currentClassify}
        options={options}
        handleCancel={() => setAddModalVisible(false)}
        handleOk={operationGoodClassify}
      />
    </div>
  )
}

export default Classify

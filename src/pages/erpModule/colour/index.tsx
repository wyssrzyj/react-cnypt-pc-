import React, { useState, useEffect } from 'react'
import { Button, Table, Modal, message, Switch, Divider } from 'antd'
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import { get } from 'lodash'
import { useStores, observer } from '@/utils/mobx'
import classNames from 'classnames'
import { SearchInput, Icon } from '@/components'
import { GroupList, GroupModal, AddModal, ImportModal } from '../components'
import styles from './index.module.less'

const { NODE_ENV } = process.env

const hosts = new Map()
hosts.set('development', 'http://8.136.225.110:8888/')
hosts.set('test', 'http://8.136.225.110:8888/')
hosts.set('production', 'http://47.97.217.13:8888/')

const titleMap = { add: '新增分组', edit: '编辑分组' }

const rowKey = 'id'

const Colour = () => {
  const pageSize = 10
  const { erpModuleStore } = useStores()
  const {
    goodGroupLists,
    editGoodGroup,
    allColor,
    editColor,
    currentColorId,
    deleteGoodColor,
    deleteColor,
    updateGroupId
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
  const [importVisible, setImportVisible] = useState<boolean>(false)
  const [otherName, setOtherName] = useState<string>(undefined)
  const [otherNumber, setOtherNumber] = useState<string>(undefined)

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
      title: '尺寸名称',
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
      render: (value, row) => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            onChange={checked => onSwitchChange(checked, row)}
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

  const onSwitchChange = (checked, values) => {
    values.status = checked
    operationGoodClassify(values)
  }
  // 删除商品分类
  const deleteClassify = (name, id) => {
    Modal.confirm({
      title: `确认删除 ${name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteColor('color', id).then(response => {
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
      setCurrentGroup({})
    } else {
      if (currentColorId) {
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
        deleteGoodColor('color', id).then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          if (success) {
            getGoodGroupLists()
            getAllGoodGroup()
            updateGroupId('color', undefined)
          }
        })
      }
    })
  }

  const addClassify = (values = {}) => {
    setAddModalVisible(true)
    setClassifyTitle('颜色')
    setCurrentClassify({ ...values })
  }

  const getGoodGroupLists = () => {
    goodGroupLists('color', {
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
    goodGroupLists('color', {
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
    editGoodGroup('color', {
      ...values,
      id: currentGroup.id
    }).then(response => {
      const { success, msg } = response
      message[success ? 'success' : 'error'](msg)
      if (success) {
        getGoodGroupLists()
        getAllGoodGroup()
        updateGroupId('color', undefined)
      }
      setGroupModalVisible(false)
    })
  }

  // 查询所有的商品分类
  const getGoodClassifyLists = () => {
    setLoading(true)
    allColor('color', {
      pageNum: tablePageNum,
      pageSize,
      groupId: currentColorId ? currentColorId : undefined,
      name: otherName,
      code: otherNumber
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
    editColor('color', {
      ...values,
      openStatus: values.status ? 1 : 0,
      id: currentClassify.id || values.id || undefined
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

  const onSerialNumberChange = value => {
    setPageNum(1)
    setOtherName(value)
  }
  const onNumberChange = value => {
    setPageNum(1)
    setOtherNumber(value)
  }

  const exportTable = () => {
    window.open(`${hosts.get(NODE_ENV)}api/basic/color/export-data`)
  }

  useEffect(() => {
    if (currentColorId) {
      const current =
        groupDataSource.find(data => data.id === currentColorId) || {}
      setCurrentGroup({ ...current })
      getGoodClassifyLists()
    }
  }, [currentColorId])

  useEffect(() => {
    getGoodClassifyLists()
  }, [tablePageNum, otherName, otherNumber])

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
          type="color"
          handleGroup={handleGroup}
          dataSource={groupDataSource}
          total={groupTotal}
          paginationChange={listPaginationChange}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.operation}>
          <div className={styles.inputSearch}>
            <label className={styles.label}>颜色编号</label>
            <SearchInput onChange={onNumberChange} />

            <label className={classNames(styles.label, styles.colorName)}>
              颜色名称
            </label>
            <SearchInput
              placeholder="请输入颜色名称"
              onChange={onSerialNumberChange}
            />
          </div>
          <div>
            <Button
              className={styles.colorBtn}
              icon={<Icon type="jack-daoru" className={styles.icon} />}
              onClick={() => setImportVisible(true)}
            >
              导入
            </Button>
            <Button
              className={styles.colorBtn}
              icon={<Icon type="jack-daochu" className={styles.icon} />}
              onClick={exportTable}
            >
              导出
            </Button>
            <Button type="primary" onClick={() => addClassify({})}>
              新增颜色
            </Button>
          </div>
        </div>
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
      {/* 导入弹框 */}
      <ImportModal
        visible={importVisible}
        field="color"
        handleCancel={() => setImportVisible(false)}
      />
    </div>
  )
}
export default observer(Colour)

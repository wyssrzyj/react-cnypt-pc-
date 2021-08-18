import React, { useState, useEffect } from 'react'
import { Tabs, Button, Table, Divider, Switch, message, Modal } from 'antd'
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import classNames from 'classnames'
import { get } from 'lodash'
import { useStores } from '@/utils/mobx'
import { SearchInput, Icon } from '@/components'
import { getUserInfo } from '@/utils/tool'
import { AddModal, ImportModal } from '../components'
import styles from './index.module.less'

const { TabPane } = Tabs

const rowKey = 'id'

const TabPaneOptions = [
  { value: 'unit', label: '计量单位' },
  { value: 'brand', label: '品牌' },
  { value: 'process', label: '生产工艺' },
  { value: 'currency', label: '币种' }
]

const titleMap = {
  unit: '单位',
  brand: '品牌',
  process: '工艺',
  currency: '币种'
}

const Others = () => {
  const pageSize = 10
  const { erpModuleStore } = useStores()
  const {
    getOtherConfiguration,
    editOtherConfiguration,
    deleteOtherConfiguration
  } = erpModuleStore
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [classifyTitle, setClassifyTitle] = useState<string>('')
  const [pageNum, setPageNum] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [dataSource, setDataSource] = useState<any>([])
  const [activeKey, setActiveKey] = useState('unit')
  const [currentValues, setCurrentValues] = useState<any>({})
  const [otherName, setOtherName] = useState<string>(undefined)
  const [otherNumber, setOtherNumber] = useState<string>(undefined)
  const [importantVisible, setImportantVisible] = useState<boolean>(false)

  const userInfo = getUserInfo() || {}
  const { factoryId } = userInfo

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
      title: '单位名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '排序',
      dataIndex: 'sortNo',
      key: 'sortNo'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: value => {
        return (
          <Switch
            checkedChildren={<CheckOutlined />}
            unCheckedChildren={<CloseOutlined />}
            checked={!!value}
          />
        )
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_value, row) => {
        const { id, name } = row
        return (
          <>
            <a
              onClick={() => {
                editOther(row)
              }}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <a onClick={() => deleteOther(id, name)}>删除</a>
          </>
        )
      }
    }
  ]

  const onSerialNumberChange = value => {
    setPageNum(1)
    setOtherName(value)
  }
  const onNumberChange = value => {
    setPageNum(1)
    setOtherNumber(value)
  }

  const addMeasure = () => {
    setCurrentValues({})
    setClassifyTitle(get(titleMap, activeKey))
    setAddModalVisible(true)
  }

  const editOther = values => {
    setClassifyTitle(get(titleMap, activeKey))
    setCurrentValues({ ...values })
    setAddModalVisible(true)
  }

  const deleteOther = (id, name) => {
    Modal.confirm({
      title: `确认删除 ${name} 吗？`,
      icon: <ExclamationCircleOutlined />,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        deleteOtherConfiguration(activeKey, id).then(response => {
          const { success, msg } = response
          message[success ? 'success' : 'error'](msg)
          success && getDataSource()
        })
      }
    })
  }

  const getDataSource = () => {
    setLoading(true)
    getOtherConfiguration(activeKey, {
      factoryId,
      pageNum,
      pageSize,
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

  const onPaginationChange = page => {
    setPageNum(page)
  }
  const onTabChange = activeKey => {
    setPageNum(1)
    setActiveKey(activeKey)
  }

  const handleModalOk = values => {
    // setPageNum(1)
    editDataSource(values)
  }

  const editDataSource = values => {
    editOtherConfiguration(activeKey, {
      tenantId: factoryId,
      ...values,
      status: values.status ? 1 : 0
    }).then(response => {
      const { success, msg } = response
      message[success ? 'success' : 'error'](msg)
      success && getDataSource()
      setAddModalVisible(false)
    })
  }

  useEffect(() => {
    getDataSource()
  }, [pageNum, activeKey, otherNumber, otherName])

  return (
    <div className={styles.others}>
      <Tabs
        activeKey={activeKey}
        type="card"
        size="large"
        onChange={onTabChange}
      >
        {TabPaneOptions.map(item => (
          <TabPane tab={item.label} key={item.value}>
            <div className={styles.operation}>
              <div className={styles.inputSearch}>
                <label className={styles.label}>
                  {get(titleMap, activeKey)}编号
                </label>
                <SearchInput
                  placeholder={`请输入${get(titleMap, activeKey)}名称`}
                  onChange={onNumberChange}
                />

                <label className={classNames(styles.label, styles.colorName)}>
                  {get(titleMap, activeKey)}名称
                </label>
                <SearchInput
                  placeholder={`请输入${get(titleMap, activeKey)}名称`}
                  onChange={onSerialNumberChange}
                />
              </div>
              <div>
                <Button
                  className={styles.colorBtn}
                  onClick={() => setImportantVisible(true)}
                  icon={<Icon type="jack-daoru" className={styles.icon} />}
                >
                  导入
                </Button>
                <Button
                  className={styles.colorBtn}
                  icon={<Icon type="jack-daochu" className={styles.icon} />}
                >
                  导出
                </Button>
                <Button type="primary" onClick={addMeasure}>
                  新增{get(titleMap, activeKey)}
                </Button>
              </div>
            </div>
            <Table
              className={styles.table}
              rowKey={rowKey}
              loading={loading}
              dataSource={dataSource}
              columns={columns}
              pagination={{
                size: 'small',
                current: pageNum,
                pageSize,
                total,
                onChange: onPaginationChange
              }}
            />
          </TabPane>
        ))}
      </Tabs>
      {/* 新增尺寸 弹框 */}
      {addModalVisible && (
        <AddModal
          visible={addModalVisible}
          title={classifyTitle}
          current={currentValues}
          handleCancel={() => setAddModalVisible(false)}
          handleOk={handleModalOk}
        />
      )}
      {/* 导入 弹框 */}
      <ImportModal
        visible={importantVisible}
        field={activeKey}
        handleCancel={() => setImportantVisible(false)}
      />
    </div>
  )
}

export default Others

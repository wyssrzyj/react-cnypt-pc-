import React, { useState, useEffect } from 'react'
import { Tabs, Button, Table, Divider, Switch } from 'antd'
import {
  ExclamationCircleOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import classNames from 'classnames'
import { useStores } from '@/utils/mobx'
import { SearchInput, Icon } from '@/components'
import { getUserInfo } from '@/utils/tool'
import { AddModal } from '../components'
import styles from './index.module.less'

const { TabPane } = Tabs

const rowKey = 'id'

const TabPaneOptions = [
  { value: 'unit', label: '计量单位' },
  { value: 'brand', label: '品牌' },
  { value: 'process', label: '生产工艺' },
  { value: 'currency', label: '币种' }
]
console.log(
  '🚀 ~ file: index.tsx ~ line 4 ~ ExclamationCircleOutlined',
  ExclamationCircleOutlined
)

const Others = () => {
  const pageSize = 10
  const { erpModuleStore } = useStores()
  const { getOtherConfiguration, editOtherConfiguration } = erpModuleStore
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [classifyTitle, setClassifyTitle] = useState<string>('')
  const [pageNum, setPageNum] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [total, setTotal] = useState<number>(0)
  const [dataSource, setDataSource] = useState<any>([])
  const [activeKey, setActiveKey] = useState('unit')

  const userInfo = getUserInfo() || {}
  const { factoryId } = userInfo

  const columns = [
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
      render: (_value, _row) => {
        return (
          <>
            <a onClick={() => {}}>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </>
        )
      }
    }
  ]

  const onSerialNumberChange = () => {}
  const onNamerChange = () => {}

  const addMeasure = () => {
    setAddModalVisible(true)
    setClassifyTitle('单位')
  }

  const getDataSource = () => {
    setLoading(true)
    getOtherConfiguration(activeKey, {
      factoryId,
      pageNum,
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
      factoryId,
      ...values
    }).then(response => {
      console.log(
        '🚀 ~ file: index.tsx ~ line 195 ~ editMeasuringUnitFn ~ response',
        response
      )
    })
  }

  useEffect(() => {
    getDataSource()
  }, [pageNum, activeKey])

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
                <label className={styles.label}>尺寸编号</label>
                <SearchInput onChange={onSerialNumberChange} />
                <label className={classNames(styles.label, styles.colorName)}>
                  尺寸名称
                </label>
                <SearchInput
                  placeholder="请输入尺寸名称"
                  onChange={onNamerChange}
                />
              </div>
              <div>
                <Button
                  className={styles.colorBtn}
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
                  新增单位
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
      <AddModal
        visible={addModalVisible}
        title={classifyTitle}
        handleCancel={() => setAddModalVisible(false)}
        handleOk={handleModalOk}
      />
    </div>
  )
}

export default Others

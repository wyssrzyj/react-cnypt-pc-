import React, { useState } from 'react'
import { Tabs, Button, Table } from 'antd'
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { SearchInput, Icon } from '@/components'
import { AddModal } from '../components'
import styles from './index.module.less'

const { TabPane } = Tabs

const TabPaneOptions = [
  { value: 'measuringUnit', label: '计量单位' },
  { value: 'brand', label: '品牌' },
  { value: 'productionProcess', label: '生产工艺' },
  { value: 'currency', label: '币种' }
]

const Others = () => {
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [classifyTitle, setClassifyTitle] = useState<string>('')

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号'
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号'
    }
  ]

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address'
    }
  ]

  const onSerialNumberChange = () => {}
  const onNamerChange = () => {}

  const addMeasure = () => {
    setAddModalVisible(true)
    setClassifyTitle('单位')
  }

  return (
    <div className={styles.others}>
      <Tabs defaultActiveKey="1" type="card" size="large">
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
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={addMeasure}
                >
                  新增单位
                </Button>
              </div>
            </div>
            <Table
              className={styles.table}
              dataSource={dataSource}
              columns={columns}
            />
          </TabPane>
        ))}
      </Tabs>
      {/* 新增尺寸 弹框 */}
      <AddModal
        visible={addModalVisible}
        title={classifyTitle}
        handleCancel={() => setAddModalVisible(false)}
      />
    </div>
  )
}

export default Others

import React, { useState } from 'react'
import { Button, Table, Modal } from 'antd'
import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import classNames from 'classnames'
import { SearchInput, Icon } from '@/components'
import { GroupList, GroupModal, AddModal } from '../components'
import styles from './index.module.less'

const titleMap = { add: '新增分组', edit: '编辑分组' }

const Measure = () => {
  const [groupModalVisible, setGroupModalVisible] = useState<boolean>(false)
  const [addModalVisible, setAddModalVisible] = useState<boolean>(false)
  const [groupTitle, setGroupTitle] = useState<string>('')
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

  const addColour = () => {
    setAddModalVisible(true)
    setClassifyTitle('尺寸')
  }

  return (
    <div className={styles.classify}>
      <div className={styles.left}>
        <GroupList handleGroup={handleGroup} />
      </div>
      <div className={styles.right}>
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
              onClick={addColour}
            >
              新增尺寸
            </Button>
          </div>
        </div>
        <Table
          className={styles.table}
          dataSource={dataSource}
          columns={columns}
        />
      </div>

      {/* 新增 编辑 分组 弹框 */}
      <GroupModal
        title={groupTitle}
        visible={groupModalVisible}
        handleCancel={() => setGroupModalVisible(false)}
      />
      {/* 新增商品分类 弹框 */}
      <AddModal
        visible={addModalVisible}
        title={classifyTitle}
        handleCancel={() => setAddModalVisible(false)}
      />
    </div>
  )
}
export default Measure

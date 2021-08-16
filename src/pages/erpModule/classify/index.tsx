import React, { useState } from 'react'
import { Button, Table, Modal } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { get } from 'lodash'
import { GroupList, GroupModal, AddModal } from '../components'
import styles from './index.module.less'

const titleMap = { add: '新增分组', edit: '编辑分组' }

const Classify = () => {
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

  const addClassify = () => {
    setAddModalVisible(true)
    setClassifyTitle('分类')
  }

  return (
    <div className={styles.classify}>
      <div className={styles.left}>
        <GroupList handleGroup={handleGroup} />
      </div>
      <div className={styles.right}>
        <Button type="primary" onClick={addClassify}>
          新增商品分类
        </Button>
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

export default Classify

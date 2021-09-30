import React from 'react'
import { Table } from 'antd'

import './style.less'

const PersonnelTable = props => {
  const { operateModal } = props
  const dataSource = [
    {
      index: '1',
      name: 'jack_01',
      realName: '刘一',
      department: '开发部-测试组'
    },
    {
      index: '2',
      name: 'jack_01',
      realName: '刘一',
      department: '开发部-测试组'
    },
    {
      index: '3',
      name: 'jack_01',
      realName: '刘一',
      department: '开发部-测试组'
    }
  ]

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index'
    },
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '真实姓名',
      dataIndex: 'realName',
      key: 'realName'
    },
    {
      title: '部门名称',
      dataIndex: 'department',
      key: 'department'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: () => {
        return <a onClick={() => operateModal('modify')}>修改部门</a>
      }
    }
  ]
  return (
    <Table
      size="small"
      className="personnel-table"
      dataSource={dataSource}
      columns={columns}
    />
  )
}

export default PersonnelTable

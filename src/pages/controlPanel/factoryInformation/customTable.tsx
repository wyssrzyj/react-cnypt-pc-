import React, { useRef, useState } from 'react'
import styles from './customTable.module.less'
import type { ActionType, ProColumns } from '@ant-design/pro-table'
import { EditableProTable } from '@ant-design/pro-table'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

type DataSourceType = {
  id: React.Key
  name?: string
  brand?: string
  count?: string | number
  model?: string
}

const defaultData: DataSourceType[] = new Array(2).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    name: `活动名称${index}`,
    count: 50,
    brand: '太平鸟',
    model: '型号驱蚊器翁'
  }
})

const CustomTable = () => {
  const actionRef = useRef<ActionType>()

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() =>
    defaultData.map(item => item.id)
  )
  const [dataSource, setDataSource] = useState<DataSourceType[]>(
    () => defaultData
  )

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '设备名',
      align: 'center',
      dataIndex: 'title',
      width: '30%'
    },
    {
      title: '数量(台)',
      dataIndex: 'count',
      align: 'center',
      key: 'count'
    },
    {
      title: '型号',
      dataIndex: 'model',
      align: 'center',
      key: 'model'
    },
    {
      title: '品牌',
      dataIndex: 'brand',
      align: 'center',
      key: 'brand'
    },
    {
      title: '操作',
      valueType: 'option',
      width: 90,
      render: () => {
        return null
      }
    }
  ]

  const addNewLine = () => {
    const data = cloneDeep(dataSource)
    const keys = cloneDeep(editableKeys)
    const id = Date.now()
    data.push({ id })
    keys.push(id)
    setDataSource(data)
    setEditableRowKeys(keys)
  }

  return (
    <div className={styles.customTableBox}>
      <EditableProTable<DataSourceType>
        headerTitle="设备列表"
        columns={columns}
        rowKey="id"
        value={dataSource}
        onChange={setDataSource}
        recordCreatorProps={false}
        toolBarRender={() => {
          return [
            <Button
              type="primary"
              key="save"
              onClick={() => {
                // dataSource 就是当前数据，可以调用 api 将其保存
                console.log(dataSource, 'dataSource')
              }}
            >
              保存数据
            </Button>,
            <Button type="primary" onClick={addNewLine} icon={<PlusOutlined />}>
              新建一行
            </Button>
          ]
        }}
        editable={{
          type: 'multiple', // single multiple
          editableKeys, // 编辑的行的id集合
          actionRender: (row, config, defaultDoms) => {
            return [defaultDoms.delete]
          },
          onValuesChange: (record, recordList) => {
            setDataSource(recordList)
          },
          onChange: setEditableRowKeys
        }}
      />
    </div>
  )
}

export default CustomTable

import React, { useEffect, useState } from 'react'
import styles from './bindOrder.module.less'
import { Input, Button, Table } from 'antd'
import { Icon } from '@/components'
import { useHistory } from 'react-router'
import { ColumnType } from 'antd/lib/table'
import { cloneDeep } from 'lodash'

const INPUT_ICON = <Icon type={'jack-sousuo1'}></Icon>

interface DataType {
  key: React.Key
  name: string
  age: number
  address: string
}

interface Columns {
  align?: string
}

interface Params {
  sortField: string
  sortType: string
  pageNum: number
  pageSize: number
}

const initParams = {
  pageNum: 1,
  pageSize: 20
}

const BindOrder = () => {
  const history = useHistory()
  const [search, setSearch] = useState()
  const [selectKeys, setSelectKeys] = useState<React.Key[]>([])
  const [params, setParams] = useState<Partial<Params>>(initParams)
  const [dataSource, setDataSource] = useState<any[]>([])

  const valueChange = event => {
    const { value } = event.target
    setSearch(value)
  }

  const getSearch = () => {
    const params = {
      name: search
    }
    console.log(
      '🚀 ~ file: bindOrder.tsx ~ line 20 ~ getSearch ~ params',
      params
    )
  }

  const columns: ColumnType<Columns>[] = [
    {
      title: '款名',
      align: 'center',
      dataIndex: 'a'
    },
    {
      title: '单号',
      align: 'center',
      dataIndex: 'b'
    },
    {
      title: '照片',
      align: 'center',
      dataIndex: 'c',
      render: img => <img src={img} className={styles.orderImg} alt="" />
    },
    {
      title: '客户',
      align: 'center',
      dataIndex: 'd'
    },
    {
      title: '下单时间',
      align: 'center',
      dataIndex: 'e',
      sorter: true
    },
    {
      title: '交期时间',
      align: 'center',
      dataIndex: 'f',
      sorter: true
    }
  ]

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], _selectedRows: DataType[]) => {
      setSelectKeys(selectedRowKeys)
    }
  }

  const tableChange = (pagination, _filters, sorter, _extra) => {
    const newParams = cloneDeep(params)
    const { field, order } = sorter
    const { current, pageSize } = pagination
    newParams.sortType = order ? (order === 'ascend' ? 'asc' : 'desc') : null
    newParams.sortField = field
    newParams.pageSize = pageSize
    newParams.pageNum = current
    console.log(
      '🚀 ~ file: bindOrder.tsx ~ line 103 ~ tableChange ~ newParams',
      newParams
    )
    setParams(newParams)
  }

  const cancel = () => {
    history.goBack()
  }

  useEffect(() => {
    console.log(selectKeys, 'selectKeys')
  }, [])

  useEffect(() => {
    setDataSource([])
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.search}>
          <Input
            onChange={valueChange}
            placeholder={'请输入搜索的订单名称、编号'}
            prefix={INPUT_ICON}
            className={styles.searchInput}
          />
          <Button
            type={'primary'}
            onClick={getSearch}
            className={styles.searchBtn}
          >
            查询
          </Button>
        </div>

        <Table
          rowSelection={
            {
              type: 'checkbox',
              ...rowSelection
            } as any
          }
          columns={columns}
          dataSource={dataSource}
          rowKey={'id'}
          onChange={tableChange}
          pagination={{
            position: ['bottomCenter'],
            current: params.pageNum,
            pageSize: params.pageSize,
            pageSizeOptions: ['5', '10', '20', '50'],
            total: 200
          }}
        />
      </div>
      <div className={styles.btns}>
        <Button type={'primary'} ghost className={styles.btn} onClick={cancel}>
          取消
        </Button>
        <Button type={'primary'} className={styles.btn}>
          确定
        </Button>
      </div>
    </div>
  )
}

export default BindOrder

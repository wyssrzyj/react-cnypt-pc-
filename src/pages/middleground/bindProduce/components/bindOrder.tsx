import React, { useEffect, useState } from 'react'
import styles from './bindOrder.module.less'
import { Input, Button, Table } from 'antd'
import { Icon } from '@/components'
import { useHistory, useParams } from 'react-router'
import { ColumnType } from 'antd/lib/table'
import { cloneDeep } from 'lodash'
import { useStores } from '@/utils/mobx'
import moment from 'moment'

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
  page: number
  limit: number // 页大小,
  keyword: string
  deliveryDate: string
  orderDate: string
}

const initParams = {
  page: 1,
  limit: 10, // 页大小,
  keyword: '', //关键词
  deliveryDate: '',
  orderDate: ''
}

const BindOrder = () => {
  const history = useHistory()
  const { orderStore } = useStores()
  const { getYOUCHANList, bindProcduce, getBindInfo } = orderStore
  const routerParams: { id: string } = useParams()

  const [search, setSearch] = useState()
  const [totalKeysArr, setTotalKeysArr] = useState<string[]>([])
  const [params, setParams] = useState<Partial<Params>>(initParams)
  const [dataSource, setDataSource] = useState<any[]>([])
  const [total, setTotal] = useState<number>(0)

  const [currentKeys, setCurrentKeys] = useState<any[]>([])
  const [anotherKeys, setAnotherKeys] = useState<any[]>([])

  useEffect(() => {
    ;(async () => {
      const bindInfo = await getBindInfo(routerParams.id)
      if (
        bindInfo &&
        bindInfo.type &&
        Array.isArray(bindInfo.productionIdList)
      ) {
        setTotalKeysArr(bindInfo.productionIdList)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      await getDataList()
    })()
  }, [params])

  const valueChange = event => {
    const { value } = event.target
    setSearch(value)
  }

  const getSearch = () => {
    const newParams = cloneDeep(params)
    newParams.keyword = `${search}`.trim()
    newParams.page = 1
    setParams(newParams)
  }

  const columns: ColumnType<Columns>[] = [
    {
      title: '款名',
      align: 'center',
      dataIndex: 'styleName'
    },
    {
      title: '单号',
      align: 'center',
      dataIndex: 'orderNo'
    },
    {
      title: '照片',
      align: 'center',
      dataIndex: 'styleImg',
      render: img => <img src={img} className={styles.orderImg} alt="" />
    },
    {
      title: '客户',
      align: 'center',
      dataIndex: 'name'
    },
    {
      title: '下单时间',
      align: 'center',
      dataIndex: 'orderDate',
      sorter: true,
      render: time => (time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : null)
    },
    {
      title: '交期时间',
      align: 'center',
      dataIndex: 'deliveryDate',
      sorter: true,
      render: time => (time ? moment(time).format('YYYY-MM-DD HH:mm:ss') : null)
    }
  ]

  const rowSelection = {
    selectedRowKeys: currentKeys,
    onChange: (selectedRowKeys: React.Key[], _selectedRows: DataType[]) => {
      setCurrentKeys(selectedRowKeys)
      setTotalKeysArr([...selectedRowKeys, ...anotherKeys])
    }
  }

  const tableChange = async (pagination, _filters, sorter, _extra) => {
    const newParams = cloneDeep(params)
    const { field, order } = sorter
    const { current, pageSize } = pagination
    newParams[field] = order ? (order === 'ascend' ? 'asc' : 'desc') : null
    newParams.limit = pageSize
    newParams.page = current

    setParams(newParams)
  }

  const findCurKeys = (data, keys) => {
    let otherKeys = cloneDeep(keys)
    const curKeys = []
    if (Array.isArray(data)) {
      data.forEach(item => {
        const index = otherKeys.indexOf(item.orderId)
        if (index > -1) {
          curKeys.push(item.orderId)
          otherKeys = otherKeys.filter(i => i !== item.orderId)
        }
      })
    }
    return {
      otherKeys,
      curKeys
    }
  }

  const getDataList = async () => {
    const data = await getYOUCHANList(params)
    if (data) {
      const { records = [], total = 0 } = data

      setDataSource(records)
      setTotal(total)
    }
  }

  useEffect(() => {
    if (Array.isArray(dataSource) && dataSource.length) {
      const { otherKeys, curKeys } = findCurKeys(dataSource, totalKeysArr)
      setCurrentKeys(curKeys)
      setAnotherKeys(otherKeys)
    }
  }, [totalKeysArr, dataSource])

  useEffect(() => {
    // console.log(currentKeys, 'currentKeys')
  }, [currentKeys])

  const cancel = () => {
    history.goBack()
  }

  const bindYOUCHANOrder = async () => {
    const params = {
      productionIdList: [...currentKeys, ...anotherKeys],
      platformOrderId: routerParams.id,
      status: 3,
      type: 1
    }

    const res = await bindProcduce(params)
    res && history.goBack()
  }

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
          rowKey={'orderId'}
          onChange={tableChange}
          pagination={{
            position: ['bottomCenter'],
            current: params.page,
            pageSize: params.limit,
            pageSizeOptions: ['5', '10', '20', '50'],
            total: total
          }}
        />
      </div>
      <div className={styles.btns}>
        <Button type={'primary'} ghost className={styles.btn} onClick={cancel}>
          取消
        </Button>
        <Button
          type={'primary'}
          className={styles.btn}
          onClick={bindYOUCHANOrder}
        >
          确定
        </Button>
      </div>
    </div>
  )
}

export default BindOrder

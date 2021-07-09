import { Key, useEffect, useState } from 'react'
import { TablePaginationConfig } from 'antd'
import * as _ from 'lodash'
import { SorterResult } from 'antd/lib/table/interface'
import { FilterValue } from 'antd/es/table/interface'
import { getTreeData } from '@/utils/tool'

type Target = {
  pageNum?: number
  pageSize?: number
  condition?: any
  [key: string]: any
}

const useTableChange = (params, getData, type?: string) => {
  const [dataSource, setDataSource] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [sorterField, setSorterField] = useState<string>('')
  const [order, setOrder] = useState<string>('')
  const [pageNum, setPageNum] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)

  useEffect(() => {
    ;(async () => {
      await getDataList()
    })()
  }, [params, pageNum, pageSize, sorterField, order])

  const getDataList = async () => {
    const target: Target = { ...params }
    target.pageNum = pageNum
    target.pageSize = pageSize
    // const keys = Reflect.ownKeys(params)
    // if (keys.length > 0) {
    //   target.condition = { ...params }
    // }

    const { records, total } = await getData(target)

    if (type === 'tree' && records) {
      const treeData = getTreeData(records)
      setTotal(total)
      setDataSource(treeData)
    }
    if (type !== 'tree' && records) {
      setTotal(total)
      setDataSource(records)
    }
  }

  const tableChange = (
    pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue>,
    sorter: SorterResult<any>
  ) => {
    const { current, pageSize } = pagination
    setPageNum(current)
    setPageSize(pageSize)

    const { field, order } = sorter
    setSorterField(field as string)
    setOrder(order)
  }

  const changeData = (field: string, value: any, idx: number | Key) => {
    const newData = _.cloneDeep(dataSource)
    newData[idx][field] = value
    setDataSource(newData)
  }

  return {
    tableChange,
    dataSource,
    total,
    sorterField,
    order,
    pageNum,
    pageSize,
    getDataList,
    changeData
  }
}

export default useTableChange

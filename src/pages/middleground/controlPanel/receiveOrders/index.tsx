import React, { useState, useEffect, useRef } from 'react'
import { Tabs, Pagination } from 'antd'
import { useHistory, useLocation } from 'react-router'
import { urlGet } from '@/utils/tool'
import styles from './index.module.less'
import { cloneDeep, isArray, isEmpty } from 'lodash'
import SearchBar from './components/searchBar'
import ListHeader from './components/listHeader'
import ListCard from './components/listCard'
import { useStores } from '@/utils/mobx'

const { TabPane } = Tabs

export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

type OptionType = {
  label: string
  key: number | string
  url?: string
}

const tabs: Array<OptionType> = [
  { label: '全部', url: '', key: 'all' },
  { label: '新需求', url: '', key: 'request' },
  { label: '待反馈', url: '', key: 'doing' },
  { label: '已确认', url: '', key: 'confirm' },
  { label: '被谢绝', url: '', key: 'checked' },
  { label: '已取消', url: '', key: 'complete' }
]

export const tabsStatus = new Map()
tabsStatus.set('all', '0')
tabsStatus.set('request', '1')
tabsStatus.set('doing', '2')
tabsStatus.set('confirm', '3')
tabsStatus.set('checked', '-2')
tabsStatus.set('complete', '-1')

const ReceiveOrder = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname, search } = location

  const searchRef = useRef()

  const { searchOrderStore } = useStores()
  const { supplierGetOrders } = searchOrderStore

  const defaultPageSize = 10
  const [activeKey, setActiveKey] = useState<string>('all')
  const [dataSource, setDataSource] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [params, setParams] = useState<any>({
    pageNum: 1,
    pageSize: defaultPageSize
  })
  const [total, setTotal] = useState<number>(50)

  useEffect(() => {
    const res: any = urlGet() || {}
    const { key = 'all' } = res
    setActiveKey(key)
  }, [])

  useEffect(() => {
    const res: any = urlGet() || {}
    const { pageNum = 1, pageSize = defaultPageSize, key = 'all' } = res
    const keys = Reflect.ownKeys(res)
    const newParams = cloneDeep(params)
    let flag = false
    if (keys.includes('pageSize') || keys.includes('pageNum')) {
      flag =
        +pageNum === +newParams.pageNum && +pageSize === +newParams.pageSize
    }

    if (flag) return
    const targetUrl = `${location.pathname}?key=${key}&pageNum=${pageNum}&pageSize=${pageSize}`

    if (targetUrl !== `${pathname}${search}`) {
      history.replace(targetUrl)
    }

    setActiveKey(key)
    // tab页签变化 页码变化 更改查询条件
    newParams.pageNum = +pageNum || 1
    newParams.pageSize = +pageSize || defaultPageSize
    const target = +tabsStatus.get(activeKey)
    if (target !== 0) {
      newParams.status = +tabsStatus.get(activeKey)
    } else {
      // 全部订单
      delete newParams.status
    }
    setParams(newParams)
  }, [search, activeKey])

  const getData = async () => {
    setLoading(true)
    const res = await supplierGetOrders(params)
    setTotal(res.total || 0)
    setDataSource(res.records || [])
    setLoading(false)
  }

  const paginationChange = (page, pageSize) => {
    history.replace(
      `${location.pathname}?key=${activeKey}&pageNum=${page}&pageSize=${pageSize}`
    )
  }

  const tabChange = key => {
    console.log('🚀 ~ file: index.tsx ~ line 112 ~ ReceiveOrder ~ key', key)
    // tab切换时 修改activeKey
    setActiveKey(key)
    history.replace(`${location.pathname}?key=${key}`)
  }

  const changeParams = (values = {}) => {
    // 查询条件变更时 点击查询按钮的回调
    const newParams = cloneDeep(params)
    const keys = Reflect.ownKeys(values)
    keys.forEach(item => {
      newParams[item] = values[item]
    })
    setParams(newParams)
  }

  useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [params])

  return (
    <div className={styles.receiveOrders}>
      <Tabs size={'large'} activeKey={activeKey} onChange={tabChange}>
        {tabs.map((item: OptionType) => (
          <TabPane tab={item.label} key={item.key} />
        ))}
      </Tabs>

      <SearchBar callback={changeParams} ref={searchRef}></SearchBar>
      <ListHeader callback={changeParams}></ListHeader>

      {isArray(dataSource) &&
        dataSource.map((item, idx) => {
          return (
            <ListCard
              searchBar={searchRef.current}
              getData={getData}
              data={item}
              curKey={activeKey}
              key={idx}
            ></ListCard>
          )
        })}

      {isEmpty(dataSource) && !loading ? (
        <div className={styles.emptyBox}>
          <img src={ORDER_EMPTY} alt="" className={styles.orderEmpty} />
          <div className={styles.emptyText}>您还没有订单哦~</div>
        </div>
      ) : null}

      <div className={styles.pagenationBox}>
        <Pagination
          total={total}
          pageSize={+params.pageSize}
          current={+params.pageNum}
          onChange={paginationChange}
          showSizeChanger
          hideOnSinglePage
          pageSizeOptions={['5', '10', '20']}
        ></Pagination>
      </div>
    </div>
  )
}

export default ReceiveOrder

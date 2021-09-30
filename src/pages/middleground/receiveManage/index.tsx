import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.less'
import { Tabs, Button, Checkbox, Pagination } from 'antd'
import { useHistory, useLocation } from 'react-router'
import { urlGet } from '@/utils/tool'
import SearchBar from '../components/searchBar'
import { cloneDeep } from 'lodash'
import ListHeader from '../components/listHeader'
import ListCard from '../components/listCard'
import { useStores, observer } from '@/utils/mobx'
import { ORDER_EMPTY, tabsStatus } from '../putManage'
import { isEmpty, isArray } from 'lodash'

const { TabPane } = Tabs

type OptionType = {
  label: string
  key: number | string
  url?: string
}
export interface Params {
  sortType?: string
  sortField?: string
  pageNum?: number
  pageSize?: number
  name?: string
  keyword?: string
  minAmount?: string
  maxAmount?: string
  startTime?: any
  endTime?: any
  status?: string | number
}

const tabs: Array<OptionType> = [
  { label: '全部订单', url: '', key: 'all' },
  { label: '待确认', url: '', key: 'confirm' },
  { label: '进行中', url: '', key: 'doing' },
  { label: '待验收', url: '', key: 'checked' },
  { label: '已完成', url: '', key: 'complete' },
  { label: '退回', url: '', key: 'return' },
  { label: '取消', url: '', key: 'cancel' }
]

const SORT_ICON_MAP = new Map()
SORT_ICON_MAP.set(-1, 'jack-shengjiangxu-morenzhuangtai')
SORT_ICON_MAP.set(0, 'jack-shengjiangxu-shengxu')
SORT_ICON_MAP.set(1, 'jack-shengjiangxu-jiangxu')

const SORT_TYPE = new Map()
SORT_TYPE.set(-1, null)
SORT_TYPE.set(0, 'asc')
SORT_TYPE.set(1, 'desc')

const DEL_CHECK_KEYS = ['complete', 'return']

const defaultPageSize = 10

const ReceiveManage = () => {
  const history = useHistory()
  const location = useLocation()
  const { pathname, search } = location
  const searchRef = useRef()

  const { orderStore, factoryStore } = useStores()
  const { getOrders, delOrders, getEnterpriseDepartment } = orderStore
  const { productCategory } = factoryStore

  const urlParams: any = urlGet()

  const initStatus = tabsStatus.get(urlParams.key)

  const [activeKey, setActiveKey] = useState<string>('all')
  const [params, setParams] = useState<Params>({
    pageNum: 1,
    pageSize: defaultPageSize,
    status: initStatus
  })
  const [dataSource, setDataSource] = useState<any[]>([])
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [delBtnDisabled, setDelBtnDisabled] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  // 获取产品类别
  useEffect(() => {
    ;(async () => {
      await productCategory()
      await getEnterpriseDepartment()
    })()
  }, [])

  useEffect(() => {
    const searchURL = new URLSearchParams(search)
    setActiveKey(searchURL.get('key'))
  }, [location])

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

  useEffect(() => {
    const flag = dataSource.every(item => !item.checked)
    setDelBtnDisabled(flag)
  }, [dataSource])

  const tabChange = key => {
    setActiveKey(key)
    history.push(`${location.pathname}?key=${key}`)
  }

  const changeParams = (values = {}) => {
    // 查询条件变更时 点击查询按钮的回调
    const newParams = cloneDeep(params) || {}
    const keys = Reflect.ownKeys(values)
    keys.forEach(item => {
      newParams[item] = values[item]
    })
    setParams(newParams)
  }

  const getData = async () => {
    // 查询条件变更 发送请求
    setLoading(true)
    try {
      if (+params.status === 0) {
        delete params.status
      }
      const res = await getOrders(params)
      if (res) {
        const { records = [], total } = res
        records.forEach(record => {
          record.type = 'receive'
          record.checked = false
        })
        setTotal(total)
        setDataSource(records)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    ;(async () => {
      await getData()
    })()
  }, [params])

  const allChoose = event => {
    const newDataSource = cloneDeep(dataSource)
    const { checked } = event.target
    newDataSource.forEach(item => (item.checked = checked))
    setAllChecked(checked)
    setDataSource(newDataSource)
  }

  const dataChoose = (checked, index) => {
    const newDataSource = cloneDeep(dataSource)
    newDataSource[index].checked = checked
    const flag = newDataSource.every(item => item.checked)
    setAllChecked(flag)
    setDataSource(newDataSource)
  }

  const deleteOrders = async () => {
    // 删除完了之后 重新获取当前页的数据
    const list = dataSource.filter(item => item.checked)
    const targetList = list.map(item => item.id)
    await delOrders(targetList)
    await getData()
  }

  const paginationChange = (page, pageSize) => {
    history.replace(
      `${pathname}?key=${activeKey}&pageNum=${page}&pageSize=${pageSize}`
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.tabBar}>
        <Tabs size={'large'} activeKey={activeKey} onChange={tabChange}>
          {tabs.map((item: OptionType) => (
            <TabPane tab={item.label} key={item.key} />
          ))}
        </Tabs>
      </div>
      {/* 搜索栏 */}
      <SearchBar
        callback={changeParams}
        type={'receive'}
        ref={searchRef}
      ></SearchBar>
      {/* 列表头部 */}
      <ListHeader
        callback={changeParams}
        type={'receive'}
        curKey={activeKey}
      ></ListHeader>
      {/* 加工厂 退回 已完成 列表显示全选 */}
      <div>
        {isArray(dataSource) && dataSource.length > 0
          ? dataSource.map((card, idx) => {
              return (
                <ListCard
                  type={'receive'}
                  searchBar={searchRef.current}
                  getData={getData}
                  showCheck={DEL_CHECK_KEYS.includes(activeKey)}
                  data={card}
                  key={idx}
                  curKey={activeKey}
                  callback={event => dataChoose(event.target.checked, idx)}
                ></ListCard>
              )
            })
          : null}
        {isEmpty(dataSource) && !loading ? (
          <div className={styles.emptyBox}>
            <img src={ORDER_EMPTY} alt="" className={styles.orderEmpty} />
            <div className={styles.emptyText}>您还没有订单哦~</div>
          </div>
        ) : null}
        {DEL_CHECK_KEYS.includes(activeKey) ? (
          <div className={styles.chooseAllBox}>
            <Checkbox onChange={allChoose} checked={allChecked}>
              全选
            </Checkbox>
            <Button disabled={delBtnDisabled} onClick={deleteOrders}>
              批量删除
            </Button>
          </div>
        ) : null}
      </div>

      <div className={styles.pagenationBox}>
        <Pagination
          total={total}
          pageSize={+params.pageSize}
          current={+params.pageNum}
          onChange={paginationChange}
          hideOnSinglePage
          pageSizeOptions={['5', '10', '20']}
        ></Pagination>
      </div>
    </div>
  )
}

export default observer(ReceiveManage)

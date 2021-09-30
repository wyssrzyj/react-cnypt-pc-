import React, { useEffect, useState, useRef } from 'react'
import styles from './index.module.less'
import { Tabs, Button, Checkbox, Pagination } from 'antd'
import { useHistory, useLocation } from 'react-router'
import { Icon } from '@/components'
import { urlGet } from '@/utils/tool'
import SearchBar from '../components/searchBar'
import { cloneDeep } from 'lodash'
import ListHeader from '../components/listHeader'
import ListCard from '../components/listCard'
import { useStores, observer } from '@/utils/mobx'
import { isEmpty } from 'lodash'

const { TabPane } = Tabs
export const ORDER_EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/order_empty.png'

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
  purchaserTenantId?: null
  orderName?: null
  commitStartTime?: null
  commitEndTime?: null
  minimunAmount?: ''
  highestAmount?: null
  supplierTenantId?: null
}

export const tabsStatus = new Map()
tabsStatus.set('all', '0')
tabsStatus.set('confirm', '1')
tabsStatus.set('doing', '2')
tabsStatus.set('checked', '4')
tabsStatus.set('complete', '5')
tabsStatus.set('return', '-3')
tabsStatus.set('cancel', '-2')
tabsStatus.set('draft', '-1')

const tabs: Array<OptionType> = [
  { label: '全部订单', url: '', key: 'all' },
  { label: '待确认', url: '', key: 'confirm' },
  { label: '进行中', url: '', key: 'doing' },
  { label: '待验收', url: '', key: 'checked' },
  { label: '已完成', url: '', key: 'complete' },
  { label: '退回', url: '', key: 'return' },
  { label: '取消', url: '', key: 'cancel' },
  { label: '草稿箱', url: '', key: 'draft' }
]

const AddIcon = <Icon type={'jack-del'} className={styles.addIcon}></Icon>

const SORT_ICON_MAP = new Map()
SORT_ICON_MAP.set(-1, 'jack-shengjiangxu-morenzhuangtai')
SORT_ICON_MAP.set(0, 'jack-shengjiangxu-shengxu')
SORT_ICON_MAP.set(1, 'jack-shengjiangxu-jiangxu')

const SORT_TYPE = new Map()
SORT_TYPE.set(-1, null)
SORT_TYPE.set(0, 'asc')
SORT_TYPE.set(1, 'desc')

const DEL_CHECK_KEYS = ['complete', 'return', 'draft']
const defaultPageSize = 10

const PutManage = () => {
  const history = useHistory()
  const location = useLocation()
  console.log(
    '🚀 ~ file: index.tsx ~ line 84 ~ PutManage ~ rputerParams',
    location
  )
  const { pathname, search } = location
  const searchRef = useRef()

  const { orderStore, factoryStore } = useStores()
  const { getOrders, initOrderAndProduct, delOrders, getEnterpriseDepartment } =
    orderStore
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
    console.log(params, 'newParams')

    setLoading(true)

    try {
      // 查询条件变更 发送请求
      const res = await getOrders(params)
      if (res) {
        const { records = [], total } = res
        records.forEach(record => {
          record.type = 'put'
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
      console.log(params, '3333333333333')

      await getData()
    })()
  }, [params])

  useEffect(() => {
    // 批量删除按钮是否禁用 依据列表中数据是否有一个数据选中
    const flag = dataSource.every(item => !item.checked)
    setDelBtnDisabled(flag)
  }, [dataSource])

  const tabChange = key => {
    // tab切换时 修改activeKey
    setActiveKey(key)
    history.replace(`${location.pathname}?key=${key}`)
  }

  const changeParams = values => {
    // 查询条件变更时 点击查询按钮的回调
    const newParams = cloneDeep(params)
    const keys = Reflect.ownKeys(values)
    keys.forEach(item => {
      newParams[item] = values[item]
    })
    setParams(newParams)
  }

  const allChoose = event => {
    // 是否全选
    const newDataSource = cloneDeep(dataSource)
    const { checked } = event.target
    newDataSource.forEach(item => (item.checked = checked))
    setAllChecked(checked)
    setDataSource(newDataSource)
  }

  const dataChoose = (checked, index) => {
    // 列表单个选择时的操作
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

  const toAddOrder = () => {
    // 跳转到订单新增页面
    initOrderAndProduct()
    history.push('/control-panel/order/add')
  }

  const paginationChange = (page, pageSize) => {
    history.replace(
      `${pathname}?key=${activeKey}&pageNum=${page}&pageSize=${pageSize}`
    )
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.tabBar}>
          <Tabs size={'large'} activeKey={activeKey} onChange={tabChange}>
            {tabs.map((item: OptionType) => (
              <TabPane tab={item.label} key={item.key} />
            ))}
          </Tabs>

          <Button
            icon={AddIcon}
            type={'primary'}
            ghost
            className={styles.addOrderBtn}
            onClick={toAddOrder}
          >
            新增订单
          </Button>
        </div>
        {/* 搜索栏 */}
        <SearchBar
          callback={changeParams}
          type={'put'}
          ref={searchRef}
        ></SearchBar>
        {/* 列表头部 */}
        <ListHeader
          callback={changeParams}
          type={'put'}
          curKey={activeKey}
        ></ListHeader>
        {/* 加工厂 退回 已完成 列表显示全选 */}
        <div>
          {Array.isArray(dataSource) && dataSource.length > 0
            ? dataSource.map((card, idx) => {
                return (
                  <ListCard
                    type={'put'}
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
          {DEL_CHECK_KEYS.includes(activeKey) &&
          Array.isArray(dataSource) &&
          dataSource.length > 0 ? (
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
      </div>

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

export default observer(PutManage)

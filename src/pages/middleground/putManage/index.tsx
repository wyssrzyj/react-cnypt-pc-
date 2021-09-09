import React, { useEffect, useState } from 'react'
import styles from './index.module.less'
import { Tabs, Button, Checkbox } from 'antd'
import { useHistory, useLocation } from 'react-router'
import { Icon } from '@/components'
import { urlGet } from '@/utils/tool'
import SearchBar from '../components/searchBar'
import { cloneDeep } from 'lodash'
import ListHeader from '../components/listHeader'
import ListCard from '../components/listCard'
import { useStores } from '@/utils/mobx'

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
}

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

const list = [
  { type: 'put', orderStatus: -2, checked: false },
  { type: 'put', orderStatus: 1, checked: false },
  { type: 'put', orderStatus: 2, checked: false },
  { type: 'put', orderStatus: 3, checked: false },
  { type: 'put', orderStatus: 4, checked: false },
  { type: 'put', orderStatus: 5, checked: false },
  { type: 'put', orderStatus: -3, checked: false },
  { type: 'put', orderStatus: -1, checked: false }
]

const PutManage = () => {
  const history = useHistory()
  const location = useLocation()

  const { orderStore } = useStores()
  const { getOrders } = orderStore

  const [activeKey, setActiveKey] = useState<string>('all')
  const [params, setParams] = useState<Params>({
    pageNum: 1,
    pageSize: 5
  })
  const [dataSource, setDataSource] = useState<any[]>(list)
  const [allChecked, setAllChecked] = useState<boolean>(false)
  const [delBtnDisabled, setDelBtnDisabled] = useState<boolean>(false)

  useEffect(() => {
    const res: any = urlGet()
    if (res) {
      const key = res.key || 'all'
      history.replace(`${location.pathname}?key=${key}`)
      setActiveKey(key)
    } else {
      setActiveKey('all')
    }
  }, [])

  useEffect(() => {
    ;(async () => {
      await getOrders()
    })()
  }, [])

  useEffect(() => {
    const flag = dataSource.every(item => !item.checked)
    setDelBtnDisabled(flag)
  }, [dataSource])

  const tabChange = key => {
    setActiveKey(key)
    history.replace(`${location.pathname}?key=${key}`)
  }

  const changeParams = values => {
    const newParams = cloneDeep(params)
    const keys = Reflect.ownKeys(values)
    keys.forEach(item => {
      newParams[item] = values[item]
    })
    setParams(newParams)
  }

  useEffect(() => {
    console.log(params, 'params')
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

  const delOrders = () => {
    // 删除完了之后 重新获取当前页的数据
    const list = dataSource.filter(item => item.checked)
    console.log('🚀 ~ file: index.tsx ~ line 132 ~ delOrders ~ list', list)
    const newParams = cloneDeep(params)
    setParams(newParams)
  }

  const toAddOrder = () => {
    history.push('/control-panel/order/add')
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
        <SearchBar callback={changeParams}></SearchBar>
        {/* 列表头部 */}
        <ListHeader
          callback={changeParams}
          type={'put'}
          curKey={activeKey}
        ></ListHeader>
        {/* 加工厂 退回 已完成 列表显示全选 */}
        <div>
          {dataSource.map((item, idx) => {
            return (
              <ListCard
                showCheck={DEL_CHECK_KEYS.includes(activeKey)}
                data={item}
                key={idx}
                curKey={activeKey}
                callback={event => dataChoose(event.target.checked, idx)}
              ></ListCard>
            )
          })}
          {DEL_CHECK_KEYS.includes(activeKey) ? (
            <div>
              <Checkbox onChange={allChoose} checked={allChecked}>
                全选
              </Checkbox>
              <Button disabled={delBtnDisabled} onClick={delOrders}>
                批量删除
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default PutManage

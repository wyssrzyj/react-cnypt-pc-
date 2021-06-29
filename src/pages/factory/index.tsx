import React, { useState, useEffect } from 'react'
import { Pagination, Empty, Spin } from 'antd'
import { isEmpty } from 'lodash'
import axios from '@/utils/axios'
import { useStores, observer } from '@/utils/mobx'
import { FilterList, Icon } from '@/components'
import { OverflowCard, FactoryCard } from './components'
import { getCurrentUser } from '@/utils/tool'
import styles from './index.module.less'

const factoryTypes = [
  {
    type: '所有工厂',
    key: 'all',
    icon: <Icon type="jack-quanbu" className={styles.dressIcon} />
  },
  {
    type: '小单快返',
    key: 'XD',
    icon: <Icon type="jack-dingdan" className={styles.dressIcon} />
  },
  {
    type: '外贸工厂',
    key: 'WM',
    icon: <Icon type="jack-diqiu" className={styles.dressIcon} />
  },
  {
    type: '清加工工厂',
    key: 'QJG',
    icon: <Icon type="jack-ziyuan" className={styles.dressIcon} />
  },
  {
    type: '贴牌工厂',
    key: 'TP',
    icon: <Icon type="jack-biaoqian" className={styles.dressIcon} />
  }
]
// const sortList = ['综合排序', '有档期', '已认证', '最新发布']

const Factory = () => {
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const { factoryStore, commonStore } = useStores()
  const { getFactoryList, productCategory } = factoryStore
  const { factoryName } = commonStore

  // const [sort, setSort] = useState<string>('综合排序')
  const [factoryList, setFactoryList] = useState<any>([])
  const [browsingList, setBrowsingList] = useState<any>([])
  const [factoryArray, setFactoryArray] = useState<any>([])
  const [total, setTotal] = useState<number>(0)
  const [pageNum, setPageNum] = useState<number>(1)
  const [factoryParams, setFactoryParams] = useState<any>({})
  const [defaultMainId, setDefaultMainId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  // const handleFilter = value => {
  //   setSort(value)
  // }
  const getRecommendFactory = async () => {
    const response = await axios.post('/api/factory/info/list-factories', {
      pageSize: 3,
      sortField: 'newest',
      sortType: 'Desc'
    })
    const { success, data = {} } = response
    if (success) {
      const { records } = data
      setFactoryList([...records])
    }
  }
  const getBrowsingHistory = async () => {
    const response = await axios.post('/api/factory/info/reactBrowsing', {
      pageSize: 5,
      userId
    })
    const { success, data } = response
    if (success) {
      const { records } = data
      setBrowsingList([...records])
    }
  }

  const getFactoryListFn = async () => {
    setIsLoading(true)
    for (var key in factoryParams) {
      if (isEmpty(factoryParams[key])) {
        delete factoryParams[key]
      }
    }
    const params = {
      pageNum,
      pageSize: 3,
      // mainCategoryParentId: defaultMainId,
      factoryName,
      ...factoryParams
    }
    const data = (await getFactoryList(params)) || {}
    if (isEmpty(data)) {
      setTotal(0)
      setFactoryArray([])
    } else {
      const { total, records } = data
      setTotal(total)
      setFactoryArray([...records])
    }
    setIsLoading(false)
  }

  const onPaginationChange = page => {
    setPageNum(page)
  }

  const onFilterChange = params => {
    const newFactoryParams = { ...factoryParams, ...params }
    setFactoryParams({ ...newFactoryParams })
  }

  const getProductCategory = async () => {
    const data = (await productCategory()) || {}
    setDefaultMainId(data[0].id)
  }

  useEffect(() => {
    if (defaultMainId) {
      getFactoryListFn()
    }
  }, [pageNum, factoryParams, defaultMainId, factoryName])

  useEffect(() => {
    ;(async () => {
      await getProductCategory()
    })()
    getRecommendFactory()
    getBrowsingHistory()
  }, [])

  return (
    <div className={styles.factory}>
      <div className={styles.factoryContainer}>
        <FilterList types={factoryTypes} onFilterChange={onFilterChange} />
        <div className={styles.factoryContent}>
          <div className={styles.contentLeft}>
            {/* <HeaderFilter
              sortList={sortList}
              current={sort}
              handleFilter={handleFilter}
            /> */}
            <Spin size="large" spinning={isLoading}>
              {isEmpty(factoryArray) ? (
                <Empty className={styles.nodata} />
              ) : (
                factoryArray.map((item, index) => (
                  <OverflowCard key={index} {...item} />
                ))
              )}
            </Spin>
            <div className={styles.factoryPage}>
              <Pagination
                current={pageNum}
                pageSize={3}
                total={total}
                showSizeChanger={false}
                onChange={onPaginationChange}
              />
            </div>
          </div>
          <div className={styles.contentRight}>
            <div className={styles.newFactory}>
              <img
                className={styles.newFactoryImg}
                src={require('@/static/images/u1506.png')}
              />
              <div className={styles.newFactoryTitle}>工厂入驻</div>
            </div>
            <FactoryCard title="推荐好工厂" list={factoryList} />
            <FactoryCard title="最近浏览记录" list={browsingList} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default observer(Factory)

import React, { useState, useEffect } from 'react'
import { Row, Col, Pagination } from 'antd'
import { observer, useStores } from '@/utils/mobx'
import { SimpleSearch, FilterList } from '@/components'
import { OrderSearchHeader, OrderCard } from './components'
import styles from './index.module.less'
import { FactoryCard } from '../factory/components'
import axios from '@/utils/axios'
import { getCurrentUser } from '@/utils/tool'

const cardList = new Array(12).fill(0)

const SearchOrder = () => {
  const currentUser = getCurrentUser() || {}
  const { userId } = currentUser
  const { factoryStore } = useStores()
  const { productCategory } = factoryStore
  const [factoryParams, setFactoryParams] = useState<any>({})

  const [_pageNum, setPageNum] = useState<number>(1)
  const [_defaultMainId, setDefaultMainId] = useState<string>('')

  const [factoryList, setFactoryList] = useState<any>([])
  const [browsingList, setBrowsingList] = useState<any>([])

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
      pageSize: 3,
      userId
    })
    const { success, data } = response
    if (success) {
      const { records } = data
      setBrowsingList([...records])
    }
  }

  const getProductCategory = async () => {
    const data = (await productCategory()) || {}
    setDefaultMainId(data[0].id)
  }

  const onFilterChange = params => {
    const newFactoryParams = { ...factoryParams, ...params }
    setFactoryParams({ ...newFactoryParams })
    setPageNum(1)
  }

  const goDetail = () => {
    window.open(`/order-search/1`)
  }

  useEffect(() => {
    ;(async () => {
      await getProductCategory()
    })()
  }, [])

  return (
    <div className={styles.searchOrder}>
      <SimpleSearch />
      <div className={styles.orderContent}>
        {/* 搜索 */}
        <FilterList onFilterChange={onFilterChange} />
        {/* 列表头 */}
        <OrderSearchHeader />
        {/* 卡片列表 */}
        <div className={styles.content}>
          <div className={styles.contentLeft}>
            {cardList.map(item => (
              <Row key={item} onClick={goDetail}>
                <OrderCard headerConfig={{}} footerConfig={{}} />
              </Row>
            ))}
          </div>
          <div className={styles.contentRight}>
            <div className={styles.newFactory}>
              <img
                className={styles.newFactoryImg}
                src={require('@/static/images/ruzhu_bg.png')}
              />
              {/* <div className={styles.newFactoryTitle}>工厂入驻</div> */}
            </div>
            <FactoryCard title="推荐好工厂" list={factoryList} />
            <FactoryCard title="最近浏览记录" list={browsingList} />
          </div>
        </div>

        <footer className={styles.orderFooter}>
          <div className={styles.orderTotal}>总共 85 条需求单信息</div>
          <Pagination size="small" total={50} />
        </footer>
      </div>
    </div>
  )
}

export default observer(SearchOrder)

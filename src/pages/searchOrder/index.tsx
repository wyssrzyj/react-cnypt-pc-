import React, { useState, useEffect } from 'react'
import { Row, Col, Pagination } from 'antd'
import { observer, useStores } from '@/utils/mobx'
import { SimpleSearch, FilterList } from '@/components'
import { OrderSearchHeader, OrderCard } from './components'
import styles from './index.module.less'

const cardList = new Array(12).fill(0)

const SearchOrder = () => {
  const { factoryStore, searchOrderStore } = useStores()
  const { getOrderList } = searchOrderStore
  const { productCategory } = factoryStore
  const [factoryParams, setFactoryParams] = useState<any>({})

  const [_pageNum, setPageNum] = useState<number>(1)
  const [_defaultMainId, setDefaultMainId] = useState<string>('')

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
      await getOrderList({ pageNum: 1, pageSize: 12 })
      await getProductCategory()
    })()
  }, [])

  useEffect(() => {
    console.log(factoryParams, 'factoryParams')
  }, [factoryParams])

  return (
    <div className={styles.searchOrder}>
      <SimpleSearch onFilterChange={onFilterChange} />
      <div className={styles.orderContent}>
        {/* 搜索 */}
        <FilterList onFilterChange={onFilterChange} />
        {/* 列表头 */}
        <OrderSearchHeader />
        {/* 卡片列表 */}
        <Row gutter={16}>
          {cardList.map(item => (
            <Col key={item} span={8} onClick={goDetail}>
              <OrderCard headerConfig={{}} footerConfig={{}} />
            </Col>
          ))}
        </Row>
        <footer className={styles.orderFooter}>
          <div className={styles.orderTotal}>总共 85 条需求单信息</div>
          <Pagination size="small" total={50} />
        </footer>
      </div>
    </div>
  )
}

export default observer(SearchOrder)

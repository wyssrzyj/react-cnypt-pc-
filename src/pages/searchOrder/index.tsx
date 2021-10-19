import React, { useState, useEffect } from 'react'
import { Row, Col, Pagination } from 'antd'
import { observer, useStores } from '@/utils/mobx'
import { SimpleSearch, FilterList, Icon } from '@/components'
import { OrderSearchHeader, OrderCard } from './components'
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

const cardList = new Array(12).fill(0)

const SearchOrder = () => {
  const { factoryStore } = useStores()
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
        <FilterList types={factoryTypes} onFilterChange={onFilterChange} />
        {/* 列表头 */}
        <OrderSearchHeader />
        {/* 卡片列表 */}
        <Row gutter={16}>
          {cardList.map(item => (
            <Col key={item} span={8}>
              <OrderCard />
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

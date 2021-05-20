import React, { useState } from 'react'
import { Pagination } from 'antd'
import { Search, FilterList, Icon, HeaderFilter } from '@/components'
import { OverflowCard, FactoryCard } from './components'
import styles from './index.module.less'

const factoryTypes = [
  {
    type: '所有工厂',
    key: 'man',
    icon: <Icon type="jack-quanbu" className={styles.dressIcon} />,
  },
  {
    type: '小单快返',
    key: 'woman',
    icon: <Icon type="jack-dingdan" className={styles.dressIcon} />,
  },
  {
    type: '外贸工厂',
    key: 'kids',
    icon: <Icon type="jack-diqiu" className={styles.dressIcon} />,
  },
  {
    type: '清加工工厂',
    key: 'dress',
    icon: <Icon type="jack-ziyuan" className={styles.dressIcon} />,
  },
  {
    type: '贴牌工厂',
    key: 'OEM',
    icon: <Icon type="jack-biaoqian" className={styles.dressIcon} />,
  },
]
const sortList = ['综合排序', '有档期', '已认证', '最新发布']

const Factory = () => {
  const [sort, setSort] = useState('综合排序')
  const handleFilter = (value) => {
    setSort(value)
  }
  return (
    <div className={styles.factory}>
      <div className={styles.factoryContainer}>
        <Search></Search>
        <FilterList types={factoryTypes} />
        <div className={styles.factoryContent}>
          <div className={styles.contentLeft}>
            <HeaderFilter
              sortList={sortList}
              current={sort}
              handleFilter={handleFilter}
            />
            <OverflowCard />
            <OverflowCard />
            <div className={styles.factoryPage}>
              <Pagination defaultCurrent={1} total={50} />
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
            <FactoryCard title="推荐好工厂" />
            <FactoryCard title="最近浏览记录" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Factory

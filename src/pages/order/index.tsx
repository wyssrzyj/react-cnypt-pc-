import React, {useState} from 'react';
import { Pagination } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import classNames from 'classnames'
import Search from '@/components/search'
import {FliterList, Card} from './components'
import styles from './index.module.less'

const orderLists = [1,1,1,1,1,1,1,1,1,1]
const OrderSearch = () => {
  const [sort, setSort] = useState("综合排序")
  return (
    <div className={styles.order}>
       <div className={styles.orderContainer}>
        <Search></Search>
        <FliterList/>
        <div className={styles.orderContent}>
          <div className={styles.contentTitle}>
            <div onClick={()=>setSort("综合排序")} className={classNames(styles.titleItem, sort==="综合排序"?styles.active:null)}><span>综合排序</span><ArrowDownOutlined /></div>
            <div onClick={()=>setSort("最新发布")} className={classNames(styles.titleItem, sort==="最新发布"?styles.active:null)}><span>最新发布</span><ArrowDownOutlined /></div>
          </div>
          <div className={styles.orderLists}>
            {orderLists.map((item,index)=><Card key={index} {...item} />)}
          </div>
          <div className={styles.paging}>
            <Pagination className={styles.paging} defaultCurrent={1} total={50} />
          </div>
        </div>
       </div>
    </div>
  )
}

export default OrderSearch

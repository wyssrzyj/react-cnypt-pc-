import React, {useState} from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';
import classNames from 'classnames'
import Search from '@/components/search'
import {FliterList} from './components'
import styles from './index.module.less'


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
        </div>
       </div>
    </div>
  )
}

export default OrderSearch

import React, {useState} from 'react';
import { Pagination } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import classNames from 'classnames'
import Icon from '@/components/Icon'
import {Search, FilterList} from '@/components'
import {Card} from './components'
import styles from './index.module.less'

const orderLists = [1,1,1,1,1,1,1,1,1,1];
const dressTypes = [{
	type: '男装',
	key: 'man',
	icon: <Icon type="jack-xizhuang" className={styles.dressIcon}/>
},{
	type: '女装',
	key: 'woman',
	icon: <Icon type="jack-qunzi" className={styles.dressIcon}/>
},{
	type: '童装',
	key: 'kids',
	icon: <Icon type="jack-tongzhuang" className={styles.dressIcon}/>
},{
	type: '服饰',
	key: 'dress',
	icon: <Icon type="jack-fushi" className={styles.dressIcon}/>
}];

const OrderSearch = () => {
  const [sort, setSort] = useState("综合排序")
  return (
    <div className={styles.order}>
       <div className={styles.orderContainer}>
        <Search></Search>
        <FilterList types={dressTypes}/>
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

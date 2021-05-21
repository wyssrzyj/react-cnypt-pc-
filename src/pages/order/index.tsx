import React, {useState} from 'react';
import { useHistory } from 'react-router'
import { Pagination } from 'antd';
import { ArrowDownOutlined } from '@ant-design/icons';
import classNames from 'classnames'
import Icon from '@/components/Icon'
import {Search, FilterList, OrderCard} from '@/components'
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

const descLits = [{
  label: "发布时间",
  value: "2021-05-13"
},{
  label: "订单类型",
  value: "经销单，来图/来样加工"
},{
  label: "销售市场",
  value: "内销"
},{
  label: "销售件数",
  value: "1500件"
},{
  label: "单价",
  value: "10"
}]
const describe = "油画少女纯棉小吊带背心外搭"

const OrderSearch = () => {
  const history = useHistory()
  const [sort, setSort] = useState("综合排序");
  const handleCard = () => {
    history.push('./order-detail')
  }
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
            {orderLists.map((item,index)=><OrderCard key={index} handleCard={handleCard} describe={describe} list={descLits} {...item} />)}
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

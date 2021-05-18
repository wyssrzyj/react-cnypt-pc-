import React from 'react'
import {Search, FilterList} from '@/components'
import Icon from '@/components/Icon'
import styles from './index.module.less'

const factoryTypes = [{
	type: '所有工厂',
	key: 'man',
	icon: <Icon type="jack-quanbu" className={styles.dressIcon}/>
},{
	type: '小单快返',
	key: 'woman',
	icon: <Icon type="jack-dingdan" className={styles.dressIcon}/>
},{
	type: '外贸工厂',
	key: 'kids',
	icon: <Icon type="jack-diqiu" className={styles.dressIcon}/>
},{
	type: '清加工工厂',
	key: 'dress',
	icon: <Icon type="jack-ziyuan" className={styles.dressIcon}/>
},{
	type: '贴牌工厂',
	key: 'OEM',
	icon: <Icon type="jack-biaoqian" className={styles.dressIcon}/>
}];

const Factory = () => {
  return (
    <div className={styles.factory}>
      <div className={styles.factoryContainer}>
        <Search></Search>
        <FilterList types={factoryTypes}/>
      </div>
    </div>
  )
}

export default Factory

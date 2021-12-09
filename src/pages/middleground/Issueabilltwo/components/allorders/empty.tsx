import React from 'react'
import EMPTY from '@/static/images/empty.png'
import styles from './todo.module.less'

const ListK = () => {
  return (
    <div className={styles.emptys}>
      <h1>
        <img src={EMPTY} alt="" className={styles.empty} />
      </h1>
      <h3>你还没有订单偶~</h3>
    </div>
  )
}
export default ListK

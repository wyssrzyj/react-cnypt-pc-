import React from 'react'
import { Title } from '../../controlPanel/accountSafe'
import styles from './todo.module.less'

const EMPTY =
  'https://capacity-platform.oss-cn-hangzhou.aliyuncs.com/capacity-platform/platform/empty.png?x-oss-process=image/resize,limit_0,m_fill,w140,h_140/quality,q_100'

const Todo = () => {
  const emptyFlag = true

  return (
    <div className={styles.todo}>
      <Title title={'待办事项'}></Title>
      <div className={styles.todoContent}>
        {emptyFlag ? (
          <div className={styles.emptyContent}>
            <img src={EMPTY} alt="" className={styles.emptyImg} />
            <div>您目前没有任何待办事项哦 ~</div>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Todo

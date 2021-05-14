import React, { useMemo } from 'react'
import styles from '../index.module.less'

const UserCard = () => {
  const getGreetings = useMemo(() => {
    let date = new Date()
    if (date.getHours() >= 0 && date.getHours() < 12) {
      return '上午好，欢迎来到Jack产能云平台'
    } else if (date.getHours() >= 12 && date.getHours() < 18) {
      return '下午好，欢迎来到Jack产能云平台'
    } else {
      return '晚上好，欢迎来到Jack产能云平台'
    }
  }, [])

  const list = [
    { label: '进行中', count: 0 },
    { label: '待确认', count: 0 },
    { label: '待排产', count: 0 },
    { label: '已完成', count: 0 },
  ]

  return (
    <div className={styles.userCard}>
      <img src="" className={styles.avatar} alt="" />
      <div className={styles.greeting}>{getGreetings}</div>
      <div className={styles.btnBox}>
        <button className={styles.loginBtn}>登录</button>
        <button className={styles.registerBtn}>注册</button>
      </div>
      <div className={styles.orderInfoBox}>
        {list.map((item, idx) => {
          return (
            <div key={idx} className={styles.orderInfo}>
              <div className={styles.orderCount}>{item.count}</div>
              <div className={styles.orderLabel}>{item.label}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default UserCard

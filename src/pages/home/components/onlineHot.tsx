import React from 'react'
import styles from '../index.module.less'
import ONLINE_HOT from '../img/onlineHot.png'
import WOMEN from '../img/women.png'
import MEN from '../img/men.png'
import CHILD from '../img/child.png'
import UNDER_WARE from '../img/underWare.png'

const OnlineHot = () => {
  const list = [
    {
      img: ONLINE_HOT,
      url: '',
      label: '',
    },
    {
      img: WOMEN,
      url: '',
      label: '女装热卖榜',
      color: '#02a7f0',
    },
    {
      img: MEN,
      url: '',
      label: '男装热卖榜',
      color: '#f7b500',
    },
    {
      img: CHILD,
      url: '',
      label: '童装热卖榜',
      color: '#e9c38d',
    },
    {
      img: UNDER_WARE,
      url: '',
      label: '内衣热卖榜',
      color: '#fa6400',
    },
  ]

  return (
    <div className={styles.onlineHot}>
      <div className={styles.homeTitle}>电商热卖排行榜</div>
      <div className={styles.hotContent}>
        {list.map((item, idx) => {
          const style = { background: `url(${item.img})` }
          return (
            <div key={idx} style={style} className={styles.hotItem}>
              {item.label && (
                <button
                  className={styles.hotBtn}
                  style={{ background: item.color }}
                >
                  {item.label}
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default OnlineHot

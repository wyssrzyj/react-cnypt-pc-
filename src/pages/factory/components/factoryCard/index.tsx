import React from 'react'
import styles from './index.module.less'

const FactoryCard = (props) => {
  const { title } = props
  return (
    <div className={styles.factoryCard}>
      <header className={styles.cardHeader}>{title}</header>
      <ul className={styles.factoryCardContent}>
        <li>
          <div className={styles.factoryName}>金华市恒鑫玩具有限公司</div>
          <div className={styles.factoryInfo}>
            <span>所在地区：</span>
            <span>浙江省 金华市 义乌市</span>
          </div>
          <div className={styles.factoryInfo}>
            <span>主要生产：</span>
            <span>服饰,箱包/皮具,其它服饰</span>
          </div>
        </li>
        <li>
          <div className={styles.factoryName}>金华市恒鑫玩具有限公司</div>
          <div className={styles.factoryInfo}>
            <span>所在地区：</span>
            <span>浙江省 金华市 义乌市</span>
          </div>
          <div className={styles.factoryInfo}>
            <span>主要生产：</span>
            <span>服饰,箱包/皮具,其它服饰</span>
          </div>
        </li>
        <li>
          <div className={styles.factoryName}>金华市恒鑫玩具有限公司</div>
          <div className={styles.factoryInfo}>
            <span>所在地区：</span>
            <span>浙江省 金华市 义乌市</span>
          </div>
          <div className={styles.factoryInfo}>
            <span>主要生产：</span>
            <span>服饰,箱包/皮具,其它服饰</span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default FactoryCard

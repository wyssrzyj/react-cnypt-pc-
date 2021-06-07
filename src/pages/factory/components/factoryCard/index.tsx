import React from 'react'
import { isArray } from 'lodash'
import styles from './index.module.less'

const FactoryCard = props => {
  const { title, list = [] } = props
  return (
    <div className={styles.factoryCard}>
      <header className={styles.cardHeader}>{title}</header>
      <ul className={styles.factoryCardContent}>
        {list.map(item => (
          <li key={item.factoryId}>
            <div className={styles.factoryName}>{item.factoryName}</div>
            <div className={styles.factoryInfo}>
              <span>所在地区：</span>
              <span>{item.location}</span>
            </div>
            <div className={styles.factoryInfo}>
              <span>主要生产：</span>
              <span>
                {isArray(item.factoryCategoryList) &&
                  item.factoryCategoryList.join('，')}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FactoryCard

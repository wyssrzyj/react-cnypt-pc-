import React from 'react'
import { useHistory } from 'react-router'
import { Empty } from 'antd'
import { isArray, isEmpty } from 'lodash'
import styles from './index.module.less'

const FactoryCard = props => {
  const history = useHistory()
  const { title, list = [] } = props
  return (
    <div className={styles.factoryCard}>
      <header className={styles.cardHeader}>{title}</header>
      {isEmpty(list) ? (
        <Empty className={styles.noDate} />
      ) : (
        <ul className={styles.factoryCardContent}>
          {list.map(item => (
            <li key={item.factoryId}>
              <a
                className={styles.factoryName}
                onClick={() => {
                  history.push(`/factory-detail/${item.factoryId}`)
                }}
              >
                {item.factoryName}
              </a>
              <div className={styles.factoryInfo}>
                <span>所在地区：</span>
                <span>{item.factoryDistrict ? item.factoryDistrict : '待完善'}</span>
              </div>
              <div className={styles.factoryInfo}>
                <span>主要生产：</span>
                <span>{isArray(item.factoryCategoryList) ? item.factoryCategoryList.join('，') : '待完善'}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FactoryCard

import React from 'react'
import { useHistory } from 'react-router'
import { Empty } from 'antd'
import { isArray, isEmpty } from 'lodash'
import { Icon } from '@/components'
import styles from './index.module.less'
import u1190 from '@/static/images/u1190.png'

const FactoryCard = props => {
  const history = useHistory()
  const { title, list = [] } = props
  return (
    <div className={styles.factoryCard}>
      <header className={styles.cardHeader}>
        <span className={styles.titleName}>{title}</span>
      </header>
      {isEmpty(list) ? (
        <Empty className={styles.noDate} />
      ) : (
        <ul className={styles.factoryCardContent}>
          {list.map(item => (
            <li key={item.factoryId}>
              <img className={styles.cardImg} src={item.pictureUrl ? item.pictureUrl : u1190} alt="" />
              <a
                className={styles.factoryName}
                onClick={() => {
                  history.push(`/factory-detail/${item.factoryId}`)
                }}
              >
                {item.factoryName}
              </a>
              <div className={styles.factoryInfo}>
                <span className={styles.label}>
                  <Icon type="jack-diqu_bai" className={styles.tagIcon} />
                  所在地区：
                </span>
                <span>{item.factoryDistrict ? item.factoryDistrict : '待完善'}</span>
              </div>
              <div className={styles.factoryInfo}>
                <span className={styles.label}>
                  <Icon type="jack-zhuying_bai" className={styles.tagIcon} />
                  主要生产：
                </span>
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

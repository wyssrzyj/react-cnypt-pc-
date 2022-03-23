import React from 'react'
import { useHistory } from 'react-router'
import { Empty } from 'antd'
import { isArray, isEmpty } from 'lodash'
import { Icon } from '@/components'
import styles from './index.module.less'
import { toJS, useStores } from '@/utils/mobx'
import { getTrees } from './method'

const FactoryCard = props => {
  const { factoryStore } = useStores()
  const { productCategoryList } = factoryStore

  const newList = toJS(productCategoryList)

  const history = useHistory()
  const { title, list = [] } = props
  console.log('找id', list)

  return (
    <div className={styles.factoryCard}>
      <header className={styles.cardHeader}>
        <span className={styles.titleName}>{title}</span>
      </header>
      {isEmpty(list) ? (
        <Empty className={styles.noDate} />
      ) : (
        <ul className={styles.factoryCardContent}>
          {list.map(item => {
            const imgUrl = item.pictureUrl
              ? item.pictureUrl +
                '?x-oss-process=image/resize,limit_0,m_fill,w150,h_150/quality,q_100'
              : item.pictureUrl
            return (
              <li
                key={item.factoryId}
                onClick={() => {
                  history.push({
                    pathname: `/factory-detail/${item.factoryId}`,
                    state: {
                      enterpriseId: item.enterpriseId
                    }
                  })
                  // history.push(`/factory-detail/${item.factoryId}`)
                }}
              >
                <img className={styles.cardImg} src={imgUrl} alt="" />
                <a className={styles.factoryName}>{item.factoryName}</a>
                <div className={styles.factoryInfo}>
                  <span className={styles.label}>
                    <Icon type="jack-diqu_bai" className={styles.tagIcon} />
                    所在地区：
                  </span>
                  <span>
                    {item.factoryDistrict ? item.factoryDistrict : '待完善'}
                  </span>
                </div>
                <div className={styles.factoryInfo}>
                  <span className={styles.label}>
                    <Icon type="jack-zhuying_bai" className={styles.tagIcon} />
                    主要生产：
                  </span>

                  <span>
                    {isArray(item.factoryCategoryList)
                      ? getTrees(
                          item.factoryCategoryList,
                          newList,
                          'code',
                          'name'
                        ).join('、')
                      : '待完善'}
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default FactoryCard
